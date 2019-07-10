import React from "react";
import { Field, Formik } from "formik";

import { Flex, AbWrapper, MinButton } from "./StyledRebass";

import IconAddFile from "./icon-add-file";
import { IconMic, CustomIcon } from "./StyledRebass";

import { Picker } from "emoji-mart";
import("./emoji-mart.css");
import { ChatField } from "../../components/fields/ChatField";
import { AddMessageToThreadComponent } from "../../generated/apolloComponents";
import ImagePreview from "./ImagePreview";

const { log } = console;

export const inputStyles = {
  display: "none"
};

interface IChatFormProps {
  chatEmoji: string;
  emojiPickerVisible: boolean;
  sentTo: string;
  threadId: string;
  handleChatFieldChange: any;
  files: any[];
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleUploadFileClick: any;
}
const isBrowser = typeof window !== "undefined";

interface IChatFormState {
  files: any[];
}
interface IChatFormProps {
  files: any[];
}

interface createdFile {
  file: any;
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

    return await Promise.all(
      this.state.files.map(async myFile => {
        console.log("what does myFile look like?", myFile);
        return await fetch(myFile)
          .then(r => r.blob())
          .then(
            blobFile =>
              new File([blobFile], "fileNameGoesHere", {
                type: "image/png"
              })
          );
      })
    );
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
      emojiPickerVisible,
      handleChatFieldChange,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      handleUploadFileClick,
      sentTo,
      threadId
    } = this.props;
    return (
      <>
        <AddMessageToThreadComponent>
          {(
            addMessageToThread
            // ,
            // {
            //   data: dataAddMessage,
            //   error: errorAddMessage,
            //   loading: loadingAddMessage
            // }
          ) => {
            return (
              <Formik
                // enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data, { setErrors, resetForm }) => {
                  // let readyImages = this.state.files;
                  // let seeBlobs = [this.dataUriToBlob(readyImages)];
                  // this.dataUriToBlob(this.state.files[0]);

                  // let file = await fetch(this.state.files[0])
                  //   .then(r => r.blob())
                  //   .then(
                  //     blobFile =>
                  //       new File([blobFile], "fileNameGoesHere", {
                  //         type: "image/png"
                  //       })
                  //   );

                  let myFiles = await this.makeBlobUrls();
                  // log("life".toUpperCase(), file);

                  let dataForSubmit = {
                    threadId,
                    sentTo,
                    message: data.message,
                    images: [...myFiles]
                  };
                  let response;

                  try {
                    response = await addMessageToThread({
                      variables: dataForSubmit
                      // we don't update here because of subscriptions

                      // update: (cache, { data }) => {
                      //   if (!data || !data.addMessageToThread) {
                      //     return;
                      //   }
                      //   let myStuff = cache.readQuery<GetMessageThreadsQuery>({
                      //     query: GetMessageThreadsDocument
                      //   });

                      //   if (myStuff) {
                      //     myStuff.getMessageThreads.map((thread, threadIndex) => {
                      //       console.log(
                      //         "data.addMessageToThread.threadId",
                      //         data.addMessageToThread
                      //       );
                      //       console.log("thread.id", thread.id);
                      //       if (data.addMessageToThread.threadId === thread.id) {
                      //         return thread.messages.push(
                      //           data.addMessageToThread.message
                      //         );
                      //       } else {
                      //         return thread;
                      //       }
                      //     });

                      //     cache.writeQuery<GetMessageThreadsQuery>({
                      //       query: GetMessageThreadsDocument,
                      //       data: myStuff
                      //     });

                      //   } else {
                      //     return;
                      //   }
                      // }
                    });
                  } catch (error) {
                    const displayErrors: { [key: string]: string } = {};

                    let myErrors = error.graphQLErrors; //.extensions.exception.validationErrors;

                    myErrors.forEach((errorThing: any) => {
                      displayErrors[errorThing.path[0]] = errorThing.message;
                    });
                    // myErrors.forEach((validationError: any) => {
                    //   Object.values(validationError.constraints).forEach(
                    //     (message: any) => {
                    //       displayErrors[validationError.property] = message;
                    //     }
                    //   );
                    // });

                    // return setErrors(displayErrors);

                    // return setErrors({
                    //   chat: "invalid character?"
                    // });
                  }

                  if (response && response.data) {
                    // setErrors({
                    //   chat: "invalid character?"
                    // });

                    this.handleClearFilePreview();
                    resetForm({
                      threadId,
                      sentTo,
                      message: chatEmoji
                    });
                    return;
                  }
                }}
                initialValues={{
                  threadId,
                  sentTo,
                  message: ""
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                  ...args
                }) => {
                  const myChange = e => {
                    const targetEl = e.target;
                    const fieldName = targetEl.name;

                    // handleChatFieldChange(values.message);
                    setFieldValue("message", values.message + chatEmoji);

                    // setFormValues({
                    //   ...formValues,
                    //   [fieldName]: targetEl.value
                    // });
                    return handleChange(e);
                  };

                  return (
                    <>
                      <Flex
                        width={[1, 1, 1]}
                        mr="auto"
                        alignItems="center"
                        flexDirection="column"
                        style={{ position: "relative" }}
                      >
                        <ImagePreview files={this.state.files} />

                        <form
                          action=""
                          onSubmit={handleSubmit}
                          style={{ width: "100%" }}
                        >
                          <button type="submit" style={{ display: "none" }} />
                          <Field
                            id="message"
                            name="message"
                            label="message"
                            placeholder="Type something to send..."
                            type="text"
                            width="100%"
                            color="#504aa4"
                            border={0}
                            fontSize="1.1em"
                            component={ChatField}
                            onChange={e => {
                              // alert(e);
                              myChange(e);
                              // handleChatFieldChange(values.message);
                              // setFormValues({
                              //   ...formValues,
                              //   [fieldName]: targetEl.value
                              // });
                              // return handleChange(e);
                            }}
                            // onChange={e => {
                            //   myChange(e);
                            //   return handleChange(e);
                            // }}

                            // onChange={onChange}
                            // InputProps={{ onChange: onChange }}
                          />

                          <Field
                            id="sentTo"
                            name="sentTo"
                            label="sentTo"
                            value={sentTo}
                            placeholder="Send to..."
                            type="hidden"
                            width="100%"
                            color="#504aa4"
                            border={0}
                            fontSize="1.1em"
                            component={ChatField}
                          />

                          <Field
                            id="threadId"
                            name="threadId"
                            label="threadId"
                            value={threadId}
                            placeholder="Thread ID..."
                            type="hidden"
                            width="100%"
                            color="#504aa4"
                            border={0}
                            fontSize="1.1em"
                            component={ChatField}
                          />
                        </form>
                      </Flex>
                      <Flex style={{ position: "relative" }}>
                        <AbWrapper
                          width={1}
                          position="absolute"
                          right={70}
                          bottom={"100%"}
                        >
                          {emojiPickerVisible && isBrowser ? (
                            <Picker
                              onSelect={
                                emoji =>
                                  setFieldValue(
                                    "message",
                                    values.message + emoji.native
                                  )
                                // handleSelectEmojiClick({ item: emoji })
                              }
                              title="Pick your emoji..."
                            />
                          ) : (
                            ""
                          )}
                        </AbWrapper>
                        <MinButton
                          onClick={this.openFileDialog}
                          bg="transparent"
                          minHeight="35px"
                          width="3.5em"
                          style={{ padding: 0 }}
                        >
                          <input
                            ref={this.fileInputRef}
                            type="file"
                            onChange={this.onFilesAdded}
                            style={inputStyles}
                            multiple
                          />
                          <IconAddFile
                            fill="#b2b2d8"
                            size="1.4em"
                            name="add-file"
                          />
                        </MinButton>
                        <MinButton
                          onClick={handleOpenEmojiMenuClick}
                          bg="transparent"
                          minHeight="35px"
                          ml={[2, 2, 2]}
                          width="3.5em"
                          style={{ padding: 0, position: "relative" }}
                        >
                          <CustomIcon width="1.6em" fill="#b2b2d8" />
                        </MinButton>
                        <MinButton
                          onClick={handleEngageMicrophoneClick}
                          bg="transparent"
                          borderLeft="2px #eee solid"
                          my={0}
                          mx={3}
                          minHeight="35px"
                          width="3.5em"
                          style={{ padding: 0 }}
                        >
                          <IconMic width="1.4em" fill="#b2b2d8" />
                        </MinButton>
                      </Flex>
                    </>
                  );
                }}
              </Formik>
            );
          }}
        </AddMessageToThreadComponent>
      </>
    );
  }
}

export default ChatForm;
