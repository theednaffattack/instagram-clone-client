import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DragAndDrop from "./drag-and-drop";

interface IFileListState {
  files: string[];
}

interface IFileListProps {
  mutate: any;
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

class FileList extends Component<IFileListProps, FileListState> {
  constructor(props: IFileListProps) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      files: initialState.files
    };
  }
  handleDrop = (files: any) => {
    console.log("`handleDrop` FIRING");
    console.log(files.length);
    console.log(files);
    let fileList = [...this.state.files];
    console.log("fileList", fileList);

    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    console.log("fileList", fileList);
    this.props.mutate({
      variables: { picture: files[0] }
    });
    this.setState({ files: fileList });
  };
  render() {
    return (
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
    );
  }
}

const FileListMutation = () => {
  return (
    <Mutation
      mutation={gql`
        mutation($picture: Upload!) {
          addProfilePicture(picture: $picture)
        }
      `}
    >
      {mutate => (
        <FileList mutate={mutate}>
          {/* <div style={{ height: 300, width: 250 }}>
            {this.state.files.map((file, i) => (
              <div key={i}>{file}</div>
            ))}
          </div> */}
        </FileList>
      )}
    </Mutation>
  );
};

export default FileListMutation;
