import React from "react";
import { Field, Formik } from "formik";

import { Flex } from "./StyledRebass";
import { ChatField } from "../../components/fields/ChatField";
import { AddMessageToThreadComponent } from "../../generated/apolloComponents";
// import { MESSAGE_THREADS } from "../../graphql/user/subscriptions/MessageThreads";
import {
  GetMessageThreadsDocument,
  GetMessageThreadsQuery
} from "../../generated/apolloComponents";

interface IChatFormProps {
  sentTo: string;
  threadId: string;
}

function ChatForm({ sentTo, threadId }: IChatFormProps) {
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
              enableReinitialize={true}
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
                          message: ""
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
              {({ handleSubmit }) => (
                <Flex width={[1, 1, 1]} mr="auto" alignItems="center">
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
              )}
            </Formik>
          );
        }}
      </AddMessageToThreadComponent>
    </>
  );
}

export default ChatForm;
