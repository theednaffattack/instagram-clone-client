import React from "react";
import { Formik, Field } from "formik";

import { Picker } from "emoji-mart";
import("./emoji-mart.css");

import {
  CreateMessageThreadComponent,
  GetMessageThreadsDocument,
  GetMessageThreadsQuery
} from "../../generated/apolloComponents";
import { Flex, AbWrapper, MinButton, IconMic } from "./StyledRebass";
import ImagePreview from "./ImagePreview";
import { ChatField } from "../../components/fields/ChatField";
import IconAddFile from "./icon-add-file";
import CustomIcon from "./CustomIcon";

export const inputStyles = {
  display: "none"
};

export interface ICreateThreadAndAddMessageToThreadProps {
  chatEmoji: string;
  emojiPickerVisible: boolean;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  sentTo: any;
  threadId: string | null;
  newThreadInvitees: any[];
  selectedThreadId: string;
  handleThreadSelection: any;
  handleClearFilePreview: any;
  files: any[];
  openFileDialog: any;
  fileInputRef: any;
  onFilesAdded: any;
  makeBlobUrls: any;
  newThreadDisabled: boolean;
}

const isBrowser = typeof window !== "undefined";

const CreateThreadAndAddMessageToThread = React.forwardRef(
  (
    {
      chatEmoji,
      emojiPickerVisible,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      sentTo,
      threadId,
      newThreadInvitees,
      handleThreadSelection,
      handleClearFilePreview,
      files,
      openFileDialog,
      fileInputRef,
      onFilesAdded,
      makeBlobUrls,
      newThreadDisabled
    }: ICreateThreadAndAddMessageToThreadProps,
    ref
  ) => {
    return (
      <CreateMessageThreadComponent>
        {(
          createMessageThread
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
                let dataForSubmitting;
                let mySentTo;

                if (files && files.length > 0) {
                  mySentTo = newThreadInvitees[0];
                  let someFiles = await makeBlobUrls();
                  dataForSubmitting = {
                    sentTo: mySentTo.id,
                    invitees: newThreadInvitees.map(person => person.id),
                    message: data.message,
                    images: [...someFiles]
                  };
                } else {
                  mySentTo = newThreadInvitees[0];

                  dataForSubmitting = {
                    sentTo: mySentTo.id,
                    invitees: newThreadInvitees.map(person => person.id),
                    message: data.message
                  };
                }

                let response;
                let myStuff;

                try {
                  response = await createMessageThread({
                    variables: dataForSubmitting,
                    update: (cache, { data }) => {
                      if (!data || !data.createMessageThread) {
                        return;
                      }
                      myStuff = cache.readQuery<GetMessageThreadsQuery>({
                        query: GetMessageThreadsDocument
                      });

                      if (myStuff) {
                        myStuff.getMessageThreads.push(
                          data.createMessageThread
                        );

                        cache.writeQuery<GetMessageThreadsQuery>({
                          query: GetMessageThreadsDocument,
                          data: myStuff
                        });
                      } else {
                        return;
                      }
                    }
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
                    sentTo,
                    message: chatEmoji
                  });

                  let newIndex;

                  if (myStuff && myStuff.getMessageThreads) {
                    newIndex = myStuff.getMessageThreads.length - 1;
                    handleThreadSelection({ index: newIndex });
                  }
                  return;
                }
              }}
              initialValues={{
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
                            disabled={newThreadDisabled}
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
                              disabled={newThreadDisabled}
                              multiple
                            />
                            <IconAddFile
                              fill="#b2b2d8"
                              size="1.4em"
                              name="add-file"
                            />
                          </MinButton>
                          <MinButton
                            onClick={
                              newThreadDisabled
                                ? null
                                : handleOpenEmojiMenuClick
                            }
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
                              newThreadDisabled
                                ? null
                                : handleEngageMicrophoneClick
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
      </CreateMessageThreadComponent>
    );
  }
);

export default CreateThreadAndAddMessageToThread;
