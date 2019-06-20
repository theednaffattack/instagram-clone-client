import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DragAndDrop from "./drag-and-drop";

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
    console.log("`handleDrop` FIRING");
    console.log(files);
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
  };
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation($picture: Upload!) {
            addProfilePicture(picture: $picture)
          }
        `}
      >
        {mutate => (
          <DragAndDrop handleDrop={mutate}>
            <div style={{ height: 300, width: 250 }}>
              {this.state.files.map((file, i) => (
                <div key={i}>{file}</div>
              ))}
            </div>
          </DragAndDrop>
        )}
      </Mutation>
    );
  }
}

export default FileList;
