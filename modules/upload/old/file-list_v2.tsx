import React, { Component } from "react";

import DragAndDrop from "../drag-and-drop";

interface IFileListState {
  files: string[];
}

const initialState = {
  files: [
    "nice.pdf",
    "verycool.jpg",
    "amazing.png",
    "goodstuff.mp3",
    "thankyou.doc"
  ]
};

type FileListState = Readonly<IFileListState>;

class FileList extends Component<object, FileListState> {
  constructor(props: object) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      files: initialState.files
    };
  }
  handleDrop = (files: any) => {
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
  };
  render() {
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <div style={{ height: 300, width: 250 }}>
          {this.state.files.map((file, i) => (
            <div key={i}>{file}</div>
          ))}
        </div>
      </DragAndDrop>
    );
  }
}

export default FileList;
