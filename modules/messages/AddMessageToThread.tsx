import React from "react";
import { Formik, Field } from "formik";

import { Picker } from "emoji-mart";
import("./emoji-mart.css");

import { AddMessageToThreadComponent } from "../../generated/apolloComponents";
import { Flex, AbWrapper, MinButton, IconMic } from "./StyledRebass";
import ImagePreview from "./ImagePreview";
import { ChatField } from "../../components/fields/ChatField";
import IconAddFile from "./icon-add-file";
import CustomIcon from "./CustomIcon";

export const inputStyles = {
  display: "none"
};

export interface IAddMessageToThreadProps {
  chatEmoji: string;
  disabled: boolean;
  emojiPickerVisible: boolean;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  sentTo: any;
  threadId: string | null;

  handleClearFilePreview: any;
  files: any[];
  openFileDialog: any;
  fileInputRef: any;
  onFilesAdded: any;
  makeBlobUrls: any;
  newThreadInvitees: any[];
}

const isBrowser = typeof window !== "undefined";

function AddMessageToThread({
  chatEmoji,
  disabled,
  emojiPickerVisible,
  handleEngageMicrophoneClick,
  handleOpenEmojiMenuClick,
  sentTo,
  threadId,

  handleClearFilePreview,
  files,
  openFileDialog,
  fileInputRef,
  onFilesAdded,
  makeBlobUrls,
  newThreadInvitees
}: IAddMessageToThreadProps) {
  return (
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

              // let myFiles = await makeBlobUrls();
              // // log("life".toUpperCase(), file);

              // let dataForSubmit = {
              //   threadId,
              //   sentTo,
              //   message: data.message,
              //   images: [...myFiles]
              // };
              let dataForSubmitting;

              if (files && files.length > 0) {
                let someFiles = await makeBlobUrls();
                dataForSubmitting = {
                  threadId,
                  sentTo,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message,
                  images: [...someFiles]
                };
              } else {
                dataForSubmitting = {
                  threadId,
                  sentTo,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message
                };
              }

              let response;

              try {
                response = await addMessageToThread({
                  variables: dataForSubmitting
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

                handleClearFilePreview();
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
                <Flex width={[1, 1, 1]}>
                  <Flex
                    width={[1, 1, 1]}
                    mr="auto"
                    alignItems="center"
                    flexDirection="column"
                    style={{ position: "relative" }}
                  >
                    <ImagePreview files={files} />
                    <Flex width={[1, 1, 1]}>
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
                          disabled={disabled}
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
                          onClick={openFileDialog}
                          bg="transparent"
                          minHeight="35px"
                          width="3.5em"
                          style={{ padding: 0 }}
                          // mb={2}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={onFilesAdded}
                            style={inputStyles}
                            disabled={disabled}
                            multiple
                          />
                          <IconAddFile
                            fill="#b2b2d8"
                            size="1.4em"
                            name="add-file"
                          />
                        </MinButton>
                        <MinButton
                          onClick={disabled ? null : handleOpenEmojiMenuClick}
                          bg="transparent"
                          minHeight="35px"
                          ml={[2, 2, 2]}
                          // mb={2}
                          width="3.5em"
                          style={{ padding: 0, position: "relative" }}
                        >
                          <CustomIcon width="1.6em" fill="#b2b2d8" />
                        </MinButton>
                        {/* <MinButton
                          onClick={
                            disabled ? null : handleEngageMicrophoneClick
                          }
                          bg="transparent"
                          borderLeft="2px #eee solid"
                          // mb={2}
                          mx={3}
                          minHeight="35px"
                          width="3.5em"
                          style={{ padding: 0 }}
                        >
                          <IconMic width="1.4em" fill="#b2b2d8" />
                        </MinButton> */}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              );
            }}
          </Formik>
        );
      }}
    </AddMessageToThreadComponent>
  );
}

export default AddMessageToThread;
