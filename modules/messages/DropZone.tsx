import React, { Component } from "react";

import { Flex } from "./StyledRebass";
import ImagePreview from "./ImagePreview";

const { log } = console;

export const inputStyles = {
  display: "none"
};

interface IDropZoneProps {
  disabled: boolean;
  onFilesAdded: any;
}

interface IDropZoneState {
  highlight: boolean;
  files: any[];
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

    this.state = {
      highlight: false,
      files: []
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

  makeObjectUrls(someArray) {
    return someArray.map(file => URL.createObjectURL(file));
  }

  onFilesAdded(evt: any) {
    evt && evt.preventDefault ? evt.preventDefault() : null;
    if (this.props.disabled) return;

    let array;

    if (evt && evt.target) {
      array = this.fileListToArray(evt.target.files);
      const previewFiles = this.makeObjectUrls(array);
      this.setState({
        files: [...previewFiles]
      });
    } else {
      array = this.fileListToArray(evt);
      const previewFiles = this.makeObjectUrls(array);

      this.setState({
        files: [...previewFiles]
      });
    }

    if (this.onFilesAdded) {
      this.props.onFilesAdded(array);
    }
  }

  render() {
    return (
      <Flex>
        <div
          style={{
            height: "200px",
            minHeight: "200px",
            width: "200px",
            backgroundColor: this.state.highlight ? "rgb(188,185,236)" : "#fff",
            border: "2px dashed rgb(187, 186, 186)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "16px",
            cursor: this.props.disabled ? "default" : "pointer"
          }}
          onClick={this.openFileDialog}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        >
          The Drop Zone
          {/* <img alt="upload" src="" /> */}
          <input
            ref={this.fileInputRef}
            type="file"
            onChange={this.onFilesAdded}
            style={inputStyles}
            multiple
          />
          <span>Upload Files</span>
        </div>
        <ImagePreview imageFiles={this.state.files} />
        {/* {this.state.files.map((imageFile, index) => (
          <img
            key={`${index}-${Math.random()}`}
            alt="file preview"
            src={imageFile}
          />
        ))} */}

        <button type="button" onClick={this.handleClearFilePreview}>
          Clear `Files` State
        </button>
      </Flex>
    );
  }
}
