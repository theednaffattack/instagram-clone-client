import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Flex as FlexBase } from "rebass";
import styled from "styled-components";
import { borders } from "styled-system";
import { Field, Formik } from "formik";

import {
  CreatePostComponent,
  CreatePostCreatePost
} from "../../generated/apolloComponents";
import { InputField } from "../../components/fields/InputField";
import { FileUploadField } from "../../components/fields/FileUploadField";

const Flex = styled(FlexBase)`
  ${borders}
`;

import DragAndDrop from "./drag-and-drop";
import { ValuesOfCorrectType } from "graphql/validation/rules/ValuesOfCorrectType";

const { log } = console;
const { stringify: str } = JSON;

function cl(args: any): void {
  return log(str(args));
}

interface IFileListState {
  files: string[];
  previewSource: ArrayBuffer | null;
  fileNames: string[];
}

interface IFileListProps {
  mutate: any;
  me: string;
}

const initialState = {
  files: [
    "nice.pdf",
    "verycool.jpg",
    "amazing.png",
    "goodstuff.mp3",
    "thankyou.doc"
  ],
  previewSource: null,
  fileNames: []
};

type FileListState = Readonly<IFileListState>;

class FileListBase extends Component<IFileListProps, FileListState> {
  image: HTMLImageElement | null;
  fileUpload: HTMLInputElement | null;
  setPreviewImageRef: React.RefObject<HTMLImageElement>;
  setFileUploadRef: React.RefObject<HTMLInputElement>;

  constructor(props: IFileListProps) {
    super(props);

    this.image = null;

    this.fileUpload = null;

    this.handleDrop = this.handleDrop.bind(this);
    this.handleFormUpload = this.handleFormUpload.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.dataURItoBlob = this.dataURItoBlob.bind(this);
    this.handlePost = this.handlePost.bind(this);

    // @ts-ignore
    this.setFileUploadRef = (reffedElement: HTMLInputElement) =>
      (this.fileUpload = reffedElement);

    // @ts-ignore
    this.setPreviewImageRef = (element: HTMLImageElement) =>
      (this.image = element);

    this.state = {
      files: initialState.files,
      previewSource: initialState.previewSource,
      fileNames: initialState.fileNames
    };
  }

  async handlePreview(self, files) {
    return await new Promise(function(resolve: any, reject: any) {
      let previewImages = new FileReader();

      previewImages.onerror = function(error) {
        // The file's text will be printed here
        reject({ error, previewImages });
      };

      previewImages.onloadend = function(event) {
        // The file's text will be printed here
        resolve(previewImages.result);
      };

      log("HANDLE PREVIEW files");
      log(files);

      const fileNames = [];

      for (var i = 0; i < files.length; i++) {
        fileNames[i] = files[i];
      }
      log(fileNames);
      self.setState({ fileNames: [...fileNames] });
      previewImages.readAsDataURL(files[0]);
    });
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    let newBlob = new Blob([ab], { type: mimeString });
    let newObj = URL.createObjectURL(newBlob);

    const finalFile = new File([newBlob], this.state.fileNames[0].name, {
      type: "image/png"
    });

    log("newBlob");
    log(URL.createObjectURL(newBlob));

    return finalFile;
  }

  async handlePost(submissionData) {
    // event.preventDefault();
    log("WHAT IS FORMIK SENDING?");
    log(submissionData);
    cl("`handlePost` FIRING");
    log(this.image.src);

    const theImage = this.dataURItoBlob(this.image.src);

    log(this.state.fileNames);

    // `text` and `title` both come from the form inputs
    this.props.mutate({
      variables: {
        data: {
          text: submissionData.text,
          title: submissionData.title,
          images: [...this.state.files],
          user: submissionData.user, //"de5527bc-58f4-4666-819c-c0e7983bdcc3",
          picture: theImage
        }
      }
      //   update: (cache, { data }) => {
      //     if (!data || !data.login) {
      //       return;
      //     }
      //     cache.writeQuery<CreatePostCreatePost>({
      //       query: createPost,
      //       data: {
      //         __typename: "Mutation",
      //         createPost: data.createPost
      //       }
      //     });
      //   }
    });
  }

  async handleFormUpload(event: React.FormEvent<HTMLInputElement>) {
    const {
      target: { files }
    } = event;
    const filesToUpload = [];
    const { keys } = Object;

    log(event);
    log(keys(event));
    log(event.target.files);
    if (files) {
      //   const { validity, files } = fileUpload;
      log("FILE UPLOAD FORM");
      //   log(validity);
      log(files);

      for (var i = 0; i < files.length; i++) {
        if (!files[i].name) return;
        filesToUpload.push(files[i].name);
      }

      this.image.src = await this.handlePreview(this, files);

      return;
    }
  }

  handleDrop = async (event: any) => {
    const { keys } = Object;
    const { fileUpload } = this;

    log("VIEW HANDLEDROP");
    log(event);

    const { dataTransfer } = event;
    log("dataTransfer", dataTransfer);

    let fileList = [...this.state.files];

    if (dataTransfer) {
      log("DRAG N DROP");
      cl(fileList);

      for (var i = 0; i < dataTransfer.files.length; i++) {
        if (!dataTransfer.files[i].name) return;
        fileList.push(dataTransfer.files[i].name);
      }

      // let b64filePreview = await handleImagePreview(this, event);

      let b64filePreview = await new Promise(function(
        resolve: any,
        reject: any
      ) {
        let previewImages = new FileReader();

        previewImages.onerror = function(error) {
          // The file's text will be printed here
          reject({ error, previewImages });
        };

        previewImages.onloadend = function(event) {
          // The file's text will be printed here
          resolve(previewImages.result);
        };

        previewImages.readAsDataURL(dataTransfer.files[0]);
      });

      this.image && b64filePreview ? (this.image.src = b64filePreview) : null;
      return;
    }

    throw Error("Upload failure, client-side");
  };

  render() {
    return (
      <>
        <Flex flexDirection="colum" border="2px limegreen dashed">
          {this.setPreviewImageRef ? (
            <img ref={this.setPreviewImageRef} alt="work REF!!!" src="" />
          ) : (
            ""
          )}
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.handlePost}
            initialValues={{
              text: "",
              title: "",
              pic: "",
              user: this.props.me
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {JSON.stringify(this.props.me)}
                <Field
                  id="title"
                  name="title"
                  placeholder="title this post"
                  component={InputField}
                />
                <Field
                  id="text"
                  name="text"
                  placeholder="say a few words"
                  component={InputField}
                />
                <Field
                  id="user"
                  name="user"
                  placeholder="say a few words"
                  component={InputField}
                />
                {/* <input id="user" name="user" type="hidden" /> */}

                <Field
                  onChange={this.handleFormUpload}
                  id="picNew"
                  name="picNew"
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  component={FileUploadField}
                />

                {/* <input
                  onChange={this.handleFormUpload}
                  type="file"
                  name="pic"
                  accept="image/*"
                  multiple
                  required
                  ref={ref => (this.fileUpload = ref)}
                /> */}
                <input type="submit" value="submit" />
              </form>
            )}
          </Formik>
        </Flex>
        <DragAndDrop handleDrop={this.handleDrop}>
          <div style={{ height: 300, width: 250 }}>
            {this.state.files.map((file, i) => (
              <div key={i}>
                <img
                  src={`http://192.168.1.8:4000/images/${file}`}
                  alt="some stuff"
                />
                {file}
              </div>
            ))}
          </div>
        </DragAndDrop>
      </>
    );
  }
}

interface IFileListMutation {
  me: string;
}

const FileListMutation = ({ me }: IFileListMutation) => {
  return (
    // <Mutation
    //   mutation={gql`
    //     mutation($data: PostInput!) {
    //       createPost(data: $data) {
    //         id
    //         title
    //         text
    //       }
    //     }
    //   `}
    // >
    <CreatePostComponent>
      {createPost => (
        <FileListBase me={me} mutate={createPost}>
          {/* <div style={{ height: 300, width: 250 }}>
            {this.state.files.map((file, i) => (
              <div key={i}>{file}</div>
            ))}
          </div> */}
        </FileListBase>
      )}
    </CreatePostComponent>
    // </Mutation>
  );
};

export default FileListMutation;
