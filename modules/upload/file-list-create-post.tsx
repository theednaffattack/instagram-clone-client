import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Flex as FlexBase, Image, Button, Text } from "rebass";
import styled from "styled-components";
import { borders, minHeight } from "styled-system";
import { Field, Formik } from "formik";

import {
  CreatePostComponent,
  CreatePostCreatePost
} from "../../generated/apolloComponents";
import { InputField } from "../../components/fields/InputField";
import { FileUploadField } from "../../components/fields/FileUploadField";

const Flex = styled(FlexBase)`
  ${borders}
  ${minHeight}
`;

import DragAndDrop from "./drag-and-drop";
import Thumb from "./thumb";
import CreatePostForm from "./create-post-form";

const { log } = console;
const { stringify: str } = JSON;

function cl(args: any): void {
  return log(str(args));
}

interface IFileListState {
  files: string[];
  previewSource: ArrayBuffer | null;
  fileNames: string[];
  fileInputKey: string;
}

interface IFileListProps {
  mutate: any;
  me: string;
}

const initialState = {
  files: [],
  previewSource: null,
  fileNames: [],
  fileInputKey: Date.now().toString()
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
      fileNames: initialState.fileNames,
      fileInputKey: initialState.fileInputKey
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

      const fileNames = [...self.state.files];

      for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i]);
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
    log("view state files and names".toUpperCase());
    log(this.state.files);
    log(this.state.fileNames);

    const finalFile = new File([newBlob], this.state.files[0], {
      type: "image/png"
    });

    log("newBlob");
    log(URL.createObjectURL(newBlob));

    log("finalFile");
    log(URL.createObjectURL(finalFile));

    return finalFile;
  }

  async handlePost(submissionData, { resetForm, setErrors }) {
    // event.preventDefault();
    log("WHAT IS FORMIK SENDING?");
    log(setErrors);
    log(resetForm);
    log(submissionData.pic);
    cl("`handlePost` FIRING");
    // log(this.image.src);

    // const theImage = this.dataURItoBlob(submissionData.pic);

    log(this.state.fileNames);

    // `text` and `title` both come from the form inputs
    this.props.mutate({
      variables: {
        data: {
          text: submissionData.text,
          title: submissionData.title,
          images: [
            submissionData.pic && submissionData.pic.name
              ? submissionData.pic.name
              : this.state.files[0]
          ],
          user: submissionData.user, //"de5527bc-58f4-4666-819c-c0e7983bdcc3",
          picture:
            submissionData.pic && submissionData.pic.name
              ? submissionData.pic
              : this.dataURItoBlob(this.image.src)
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
    log("is the error after mutate?");
    resetForm({
      text: "",
      title: "",
      pic: null,
      user: this.props.me
    });
    this.setState({
      fileInputKey: Date.now().toString()
    });
    this.image && this.image.src ? (this.image.src = "") : null;
  }

  async handleFormUpload(event: React.FormEvent<HTMLInputElement>) {
    const {
      target: { files }
    } = event;

    log("VIEW event.currentTarget");
    log(event.currentTarget);
    const filesToUpload = [...this.state.files];
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

      this.setState({
        files: [...filesToUpload]
      });

      this.image.src = await this.handlePreview(this, files);

      return;
    }
  }

  handleDrop = async (event: any) => {
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

      this.setState({
        files: [...fileList]
      });

      this.image && b64filePreview ? (this.image.src = b64filePreview) : null;
      return;
    }

    throw Error("Upload failure, client-side");
  };

  render() {
    return (
      <CreatePostForm
        handlePost={this.handlePost}
        handleDrop={this.handleDrop}
        handleFormUpload={this.handleFormUpload}
        me={this.props.me}
        fileInputKey={this.state.fileInputKey}
        setPreviewImageRef={this.setPreviewImageRef}
      />
      //  <Flex flexDirection="column">
      //   <Flex minHeight="300px" width="450px">
      //     <DragAndDrop handleDrop={this.handleDrop}>
      //       {this.setPreviewImageRef ? (
      //         <Image
      //           width="100%"
      //           ref={this.setPreviewImageRef}
      //           alt=""
      //           src=""
      //         />
      //       ) : (
      //         <Text>DROP AN IMAGE HERE!</Text>
      //       )}
      //     </DragAndDrop>
      //   </Flex>
      //   <Formik
      //     validateOnBlur={false}
      //     validateOnChange={false}
      //     onSubmit={this.handlePost}
      //     initialValues={{
      //       text: "",
      //       title: "",
      //       pic: null,
      //       user: this.props.me
      //     }}
      //   >
      //     {({ handleSubmit, setFieldValue, values }) => (
      //       <form onSubmit={handleSubmit}>
      //         <Field
      //           id="title"
      //           name="title"
      //           placeholder="title this post"
      //           component={InputField}
      //         />
      //         <Field
      //           id="text"
      //           name="text"
      //           placeholder="say a few words"
      //           component={InputField}
      //         />
      //         <Field
      //           id="user"
      //           name="user"
      //           type="hidden"
      //           component={InputField}
      //         />

      //         <input
      //           id="pic"
      //           name="pic"
      //           type="file"
      //           onChange={event => {
      //             setFieldValue("pic", event.currentTarget.files[0]);
      //           }}
      //         />

      //         <Thumb file={values.pic} />

      //         <Field
      //           onChange={this.handleFormUpload}
      //           id="picNew"
      //           name="picNew"
      //           type="file"
      //           accept="image/*"
      //           multiple
      //           required
      //           component={FileUploadField}
      //         />

      //         <Button type="submit">submit</Button>
      //       </form>
      //     )}
      //   </Formik>
      // </Flex>
    );
  }
}

export default FileListBase;
