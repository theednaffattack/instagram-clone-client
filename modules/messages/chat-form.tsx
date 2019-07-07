import React from "react";
import { Field, Formik } from "formik";

import { Flex, AbWrapper, MinButton } from "./StyledRebass";

import IconAddFile from "./icon-add-file";
import { IconMic, CustomIcon } from "./StyledRebass";

// import { InputField } from "../../components/fields/InputField";
// import { FileUploadField } from "../../components/fields/FileUploadField";
import { Picker } from "emoji-mart";
import("./emoji-mart.css");
import { ChatField } from "../../components/fields/ChatField";
import { AddMessageToThreadComponent } from "../../generated/apolloComponents";
// import { MESSAGE_THREADS } from "../../graphql/user/subscriptions/MessageThreads";
import {
  GetMessageThreadsDocument,
  GetMessageThreadsQuery
} from "../../generated/apolloComponents";

interface IChatFormProps {
  chatEmoji: string;
  emojiPickerVisible: boolean;
  sentTo: string;
  threadId: string;
  handleChatFieldChange: any;

  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleUploadFileClick: any;
}
const isBrowser = typeof window !== "undefined";

function ChatForm({
  chatEmoji,
  emojiPickerVisible,
  handleChatFieldChange,

  handleEngageMicrophoneClick,
  handleOpenEmojiMenuClick,
  handleUploadFileClick,
  sentTo,
  threadId
}: IChatFormProps) {
  return (
    <>
      <AddMessageToThreadComponent>
        {(
          addMessageToThread,
          {
            data: dataAddMessage,
            error: errorAddMessage,
            loading: loadingAddMessage
          }
        ) => {
          return (
            <Formik
              // enableReinitialize={true}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors, resetForm }) => {
                let dataForSubmit = {
                  threadId,
                  sentTo,
                  message: data.message
                };
                let response;
                try {
                  response = await addMessageToThread({
                    variables: dataForSubmit,
                    update: (cache, { data }) => {
                      if (!data || !data.addMessageToThread) {
                        return;
                      }
                      let myStuff = cache.readQuery<GetMessageThreadsQuery>({
                        query: GetMessageThreadsDocument
                      });

                      if (myStuff) {
                        myStuff.getMessageThreads.map((thread, threadIndex) => {
                          console.log(
                            "data.addMessageToThread.threadId",
                            data.addMessageToThread
                          );
                          console.log("thread.id", thread.id);
                          if (data.addMessageToThread.threadId === thread.id) {
                            return thread.messages.push(
                              data.addMessageToThread.message
                            );
                          } else {
                            return thread;
                          }
                        });

                        cache.writeQuery<GetMessageThreadsQuery>({
                          query: GetMessageThreadsDocument,
                          data: myStuff
                        });

                        console.log("BEFORE RESETTING FORM");
                        resetForm({
                          threadId,
                          sentTo,
                          message: chatEmoji
                        });
                        console.log("AFTER RESETTING FORM");
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

                  return setErrors({
                    chat: "invalid character?"
                  });
                }

                if (response && response.data && !response.data.login) {
                  setErrors({
                    chat: "invalid character?"
                  });
                  return;
                }
                // Router.push("/");
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
                  // console.log("E", e);
                  const targetEl = e.target;
                  const fieldName = targetEl.name;

                  // handleChatFieldChange(values.message);
                  setFieldValue("message", values.message + chatEmoji);
                  console.log("VIEW EMOJI AND FORM FIELD VALUES", {
                    chatEmoji,
                    message: values.message,
                    newMessage: values.message + chatEmoji
                  });
                  console.log("TYPEOF CHATEMOJI", typeof chatEmoji);
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
                      style={{ position: "relative" }}
                      border="lime"
                    >
                      {JSON.stringify(values)}
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
                    <Flex border="crimson" style={{ position: "relative" }}>
                      <AbWrapper
                        width={1}
                        position="absolute"
                        right={70}
                        bottom={"100%"}
                        border="lime"
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
                        onClick={handleUploadFileClick}
                        bg="transparent"
                        minHeight="35px"
                        width="3.5em"
                        style={{ padding: 0 }}
                      >
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

export default ChatForm;
