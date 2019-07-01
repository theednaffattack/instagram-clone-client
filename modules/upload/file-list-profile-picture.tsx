import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DragAndDrop from "./drag-and-drop";

interface IFileListState {
  files: string[];
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
  ]
};

type FileListState = Readonly<IFileListState>;

class FileListBase extends Component<IFileListProps, FileListState> {
  constructor(props: IFileListProps) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      files: initialState.files
    };
  }
  handleDrop = (files: any) => {
    let fileList = [...this.state.files];

    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }

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
                src={`http://192.168.1.10:4000/images/${file}`}
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

interface IFileListMutation {
  me: string;
}

const FileListMutation = ({ me }: IFileListMutation) => {
  return (
    <Mutation
      mutation={gql`
        mutation($picture: Upload!) {
          addProfilePicture(picture: $picture)
        }
      `}
    >
      {mutate => (
        <FileListBase me={me} mutate={mutate}>
          {/* <div style={{ height: 300, width: 250 }}>
            {this.state.files.map((file, i) => (
              <div key={i}>{file}</div>
            ))}
          </div> */}
        </FileListBase>
      )}
    </Mutation>
  );
};

export default FileListMutation;
