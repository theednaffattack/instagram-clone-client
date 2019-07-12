import React from "react";
import uuidv4 from "uuid/v4";

import CreateThreadAndAddMessageToThread from "./CreateThreadAndAddMessageToThread";
import AddMessageToThread from "./AddMessageToThread";

const { log } = console;

export const inputStyles = {
  display: "none"
};

interface IChatFormProps {
  chatEmoji: string;
  disabled: boolean;
  emojiPickerVisible: boolean;
  sentTo: string;
  threadId: string;
  handleChatFieldChange: any;
  files: any[];
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleUploadFileClick: any;
  newThreadInvitees: any[];
  selectedThreadId: string;
}

interface IChatFormState {
  files: any[];
}
interface IChatFormProps {
  files: any[];
  selectedThreadId: string;
  newThreadDisabled: boolean;
}

class ChatForm extends React.Component<IChatFormProps, IChatFormState> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IChatFormProps) {
    super(props);

    this.fileInputRef = React.createRef();

    this.handleClearFilePreview = this.handleClearFilePreview.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.fileListToArray = this.fileListToArray.bind(this);
    this.makeObjectUrls = this.makeObjectUrls.bind(this);
    this.makeBlobUrls = this.makeBlobUrls.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.dataUriToBlob = this.dataUriToBlob.bind(this);

    this.state = {
      files: []
    };
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

  async makeBlobUrls() {
    // return someArray.map(file => {
    //   const quickFile: createdFile = new Blob([file], { type: "image/png" });
    //   quickFile.name = "myFakeyFile.png";
    // });
    const self = this;
    console.log("VIEW SELF", self);
    console.log("VIEW THIS", this);
    // console.log(this.state.files)

    return await Promise.all(
      // this.state.files.map(async myFile => {
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

  onFilesAdded(evt: any) {
    if (this.props.disabled) return;

    evt && evt.preventDefault ? evt.preventDefault() : null;

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

    // if (this.onFilesAdded) {
    //   this.props.onFilesAdded(array);
    // }
  }

  dataUriToBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    log("datauri".toUpperCase(), dataURI);
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
    // log(this.state.fileNames);

    const finalFile = new File([newBlob], this.state.files[0], {
      type: "image/png"
    });

    log("newBlob");
    log(URL.createObjectURL(newBlob));

    log("finalFile");
    log(URL.createObjectURL(finalFile));

    return finalFile;
  }

  render() {
    const {
      chatEmoji,
      disabled,
      emojiPickerVisible,
      handleChatFieldChange,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      handleUploadFileClick,
      sentTo,
      threadId,
      selectedThreadId,
      newThreadInvitees,
      newThreadDisabled
    } = this.props;
    return (
      <>
        {selectedThreadId ? (
          <AddMessageToThread
            handleClearFilePreview={this.handleClearFilePreview}
            disabled={disabled}
            files={this.state.files}
            openFileDialog={this.openFileDialog}
            fileInputRef={this.fileInputRef}
            onFilesAdded={this.onFilesAdded}
            makeBlobUrls={this.makeBlobUrls}
            chatEmoji={chatEmoji}
            emojiPickerVisible={emojiPickerVisible}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            sentTo={sentTo}
            threadId={threadId}
          />
        ) : (
          <CreateThreadAndAddMessageToThread
            handleClearFilePreview={this.handleClearFilePreview}
            newThreadDisabled={newThreadDisabled}
            files={this.state.files}
            openFileDialog={this.openFileDialog}
            fileInputRef={this.fileInputRef}
            onFilesAdded={this.onFilesAdded}
            makeBlobUrls={this.makeBlobUrls}
            chatEmoji={chatEmoji}
            emojiPickerVisible={emojiPickerVisible}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            sentTo={sentTo}
            threadId={threadId}
            newThreadInvitees={newThreadInvitees}
          />
        )}
      </>
    );
  }
}

export default ChatForm;
