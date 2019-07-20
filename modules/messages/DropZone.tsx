import React, { Component } from "react";
import dFormat from "date-fns/format";
import axios from "axios";

import { Button, Flex, MaxFlex } from "./StyledRebass";
import ImagePreview from "./ImagePreview";
// import { SignS3Component } from "../../generated/apolloComponents";

const { log } = console;

export const inputStyles = {
  display: "none"
};

interface IDropZoneProps {
  disabled: boolean;
  onFilesAdded: any;
  signS3: any;
}

interface IDropZoneState {
  highlight: boolean;
  files: any[];
  name: string;
}

export default class DropZone extends Component<
  IDropZoneProps,
  IDropZoneState
> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IDropZoneProps) {
    super(props);
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.fileListToArray = this.fileListToArray.bind(this);
    this.handleClearFilePreview = this.handleClearFilePreview.bind(this);
    this.makeObjectUrls = this.makeObjectUrls.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.formatFilename = this.formatFilename.bind(this);
    this.uploadToS3 = this.uploadToS3.bind(this);

    this.state = {
      highlight: false,
      files: [],
      name: ""
    };
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

    const files = evt.dataTransfer.files;

    if (this.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  }

  handleClearFilePreview() {
    this.setState({
      files: []
    });
  }

  openFileDialog() {
    if (this.props.disabled) return;
    if (this.fileInputRef && this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  }

  async makeBlobUrlsFromState() {
    const self = this;

    return await Promise.all(
      self.state.files.map(async myFile => {
        return await fetch(myFile)
          .then(r => r.blob())
          .then(
            blobFile =>
              new File([blobFile], uuidv4(), {
                type: "image/png"
              })
          );
      })
    );
  }

  async makeBlobUrlsFromReference(myFile) {
    const self = this;

    return await fetch(myFile)
      .then(r => r.blob())
      .then(
        blobFile =>
          new File([blobFile], myFile.name, {
            type: myFile.type
          })
      );

    // return await Promise.all(
    //   self.state.files.map(async myFile => {
    //     return await fetch(myFile)
    //       .then(r => r.blob())
    //       .then(
    //         blobFile =>
    //           new File([blobFile], uuidv4(), {
    //             type: "image/png"
    //           })
    //       );
    //   })
    // );
  }

  uploadToS3 = async ({ file, signedRequest }) => {
    const options = {
      headers: {
        "Content-Type": "image/png"
      }
    };
    const theFile = await this.makeBlobUrlsFromReference(file);
    console.log({ file, signedRequest });
    console.log({
      signedRequest,
      urlOrNameMaybe: theFile,
      options
    });
    await axios.put(signedRequest, theFile, options);
  };

  formatFilename = file => {
    console.log("FILename", file);
    const filename = file.name;

    const date = dFormat(new Date(), "YYYYMMDD");

    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);

    const fileExtension = file.type.substring(
      file.type.lastIndexOf("/") + 1,
      file.type.length
    );

    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const restrictedLengthCleanFileName = cleanFileName.substring(0, 40);

    log(
      "restrictedLengthCleanFileName".toUpperCase(),
      restrictedLengthCleanFileName
    );
    log("randomString & fileExtension".toUpperCase(), {
      randomString,
      fileExtension
    });

    const newFilename = `images/${date}-${randomString}-${restrictedLengthCleanFileName}.${fileExtension}`;

    return newFilename;
  };

  async getSignature() {
    const { files } = this.state;
    const { signS3 } = this.props;

    if (!files || !files[0]) return;

    console.log("Files[0]".toUpperCase(), files[0]);
    const response = await signS3({
      variables: {
        filename: files[0].name,
        filetype: files[0].type
      }
    });

    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3({
      file: files[0],
      signedRequest
    }).catch(error => console.error(JSON.stringify({ ...error }, null, 2)));

    log("anyResponse".toUpperCase(), anyResponse);

    // this needs to be a call to create Post?
    // probably wrap w/ mutation component from outside and pass in
    // const graphqlResponse = await this.props.createChampion({
    //   variables: {
    //     name,
    //     pictureUrl: url
    //   }
    // });
  }

  makeObjectUrls(someArray) {
    return someArray.map(file => {
      const {
        lastModified,
        lastModifiedDate,
        name,
        size,
        type,
        webkitRelativePath
      } = file;

      return {
        blobUrl: URL.createObjectURL(file),
        lastModified,
        lastModifiedDate,
        name: this.formatFilename(file),
        size,
        type,
        webkitRelativePath
      };
    });
  }

  onFilesAdded(evt: any) {
    evt && evt.preventDefault ? evt.preventDefault() : null;
    if (this.props.disabled) return;

    let array;

    if (evt && evt.target) {
      array = this.fileListToArray(evt.target.files);
      const previewFiles = this.makeObjectUrls(array);
      log("previewFiles if", previewFiles);
      this.setState({
        files: [...previewFiles]
      });
    } else {
      array = this.fileListToArray(evt);
      const previewFiles = this.makeObjectUrls(array);
      log("previewFiles else", previewFiles);
      this.setState({
        files: [...previewFiles]
      });
    }

    if (this.onFilesAdded) {
      this.props.onFilesAdded(array);
    }
  }

  render() {
    const { signS3 } = this.props;
    return (
      <Flex flexDirection="column" width={[1, 1, 1]}>
        The Drop DropZone
        <Flex>
          <MaxFlex
            bg={this.state.highlight ? "rgb(188,185,236)" : "#fff"}
            height="350px"
            width="350px"
            minWidth="350px"
            border="2px dashed rgb(187, 186, 186)"
            maxHeight="350px"
            style={{
              borderRadius: "50%",
              fontSize: "16px",
              cursor: this.props.disabled ? "default" : "pointer"
            }}
            onClick={this.openFileDialog}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
          >
            <input
              ref={this.fileInputRef}
              type="file"
              onChange={this.onFilesAdded}
              style={inputStyles}
              multiple
            />
            <span>Upload Files</span>
            <pre>{JSON.stringify(this.state.files, null, 2)}</pre>
          </MaxFlex>
        </Flex>
        <Button type="button" onClick={this.getSignature}>
          Upload to S3
        </Button>
        <Flex flexWrap="wrap" width={[1, 1, 1]}>
          <ImagePreview imageFiles={this.state.files} />
        </Flex>
        <Button type="button" onClick={this.handleClearFilePreview}>
          Clear `Files` State
        </Button>
      </Flex>
    );
  }
}
