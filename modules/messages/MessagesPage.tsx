import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Button, Text } from "rebass";

import { MessageThreadProps, MessagePageState } from "./types";

import { AbBox, Flex } from "./StyledRebass";
import ViewMessagesPane from "./ViewMessagesPane";
import {
  AddNewMessageComponent,
  AddNewMessageDocument,
  GetAllMyMessagesComponent
} from "../../generated/apolloComponents";
import { InputField } from "../../components/fields/InputField";

import { newMessageSub } from "../../graphql/message/subscriptions/NewMessage";
import { MessageList } from "./MessageList";

const { log } = console;
const str = JSON.stringify;

const input = {
  sentTo: "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
  user: "00a33f72-4a23-4753-a607-d98aaaed69f9"
};

const subscribeToMoreInput = {
  message: "bleaker"
};

const subscribeToMoreFunc = (subscribeToMore, variables) =>
  subscribeToMore({
    document: newMessageSub,
    variables: { message: subscribeToMoreInput.message },
    updateQuery: (prev, { subscriptionData }) => {
      // `prev` and `{ subscriptionData }` are supplied by
      // appollo to the updateQuery function

      const {
        subscribeToMoreInput: { message }
      } = variables;
      log("VIEW PREV INSIDE SUBSCRIBE TO MORE FUNC");
      log(str(prev));
      if (!subscriptionData.data) return prev;
      const newFeedItem = subscriptionData.data.newMessage;
      return Object.assign({}, prev, {
        getMyMessagesFromUser: [...prev.getMyMessagesFromUser, newFeedItem]
      });
    }
  });

export default class MessagesPage extends Component<
  MessageThreadProps,
  MessagePageState
> {
  constructor(props: MessageThreadProps) {
    super(props);
    this.subscribeToMoreFunc = subscribeToMoreFunc.bind(this);
    this.handleSelectMessageThread = this.handleSelectMessageThread.bind(this);
    this.handleSelectArchivedMessageThread = this.handleSelectArchivedMessageThread.bind(
      this
    );
    this.state = {
      selectedMessageType: "",
      selectedMessageId: null
    };
  }

  handleSelectMessageThread(event: any) {
    let {
      currentTarget: { id }
    } = event;

    this.setState({
      selectedMessageId: id,
      selectedMessageType: "ACTIVE"
    });
  }

  handleSelectArchivedMessageThread(event: any) {
    let {
      currentTarget: { id }
    } = event;
    this.setState({
      selectedMessageId: id,
      selectedMessageType: "ARCHIVED"
    });
  }

  // componentDidMount() {
  //   this.props.subscribeToNewComments();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // Typical usage (don't forget to compare props):
  //   // if (this.state.selectedMessageIndex !== prevProps.selectedMessageIndex) {
  //   //   // this.fetchData(this.props.userID);
  //   //   const pathNodes = Array.from(document.querySelectorAll(".messageWindow"));
  //   //   const justOne = pathNodes[0].getBBox();
  //   //   const arrayOfPathDimensions = pathNodes.map((node, index) => {
  //   //     console.log("VIEW NODE DIMENSIONS");
  //   //     console.log(node.getBBox());
  //   //     return node.getBBox();
  //   //   });
  //   //   console.log(arrayOfPathDimensions);
  //   //   console.log(Object.keys(pathNodes));
  //   //   console.log(justOne);
  //   // }
  // }

  render() {
    const { me } = this.props.data.data;
    return (
      <GetAllMyMessagesComponent
      // variables={{ input: { user: input.user, sentTo: me.id } }}
      >
        {({
          loading: loadingGetMessages,
          data: dataGetMessages,
          error: errorGetMessages,
          subscribeToMore: subscribeToMoreGetMessages
        }) => {
          if (errorGetMessages)
            return <div>Error!{JSON.stringify(errorGetMessages, null, 2)}</div>;

          return (
            <Flex
              flexWrap="wrap"
              px={[2, 2, 2, 4]}
              color="text"
              style={{ overflow: "hidden", minHeight: 0 }}
            >
              {/* {dataGetMessages ? JSON.stringify(dataGetMessages) : "no data"} */}

              <Flex width={[1, 1 / 2, 1 / 2]}>
                {/* LEFT PANE GOES HERE */}
                {loadingGetMessages ? (
                  <span>loading...</span>
                ) : (
                  <MessageList
                    handleSelectArchivedMessageThread={
                      this.handleSelectArchivedMessageThread
                    }
                    handleSelectMessageThread={this.handleSelectMessageThread}
                  />
                )}
              </Flex>
              {/* RIGHT PANE GOES HERE */}
              <Flex
                flexDirection="column"
                // border="lime"
                pt={5}
                pb={4}
                width={[1, 1 / 2, 1 / 2]}
                style={{
                  overflowY: "hidden",
                  maxHeight: "80vh"
                }}
                position="relative"
              >
                <AbBox
                  width={1}
                  zIndex={999}
                  bg="rgba(255,255,255,0.8)"
                  position="absolute"
                  p={4}
                  top={0}
                  left={0}
                  // style={{
                  //   filter: "blur(1.5rem)"
                  // }}
                >
                  <Text>{input.user}</Text>
                </AbBox>
                <AbBox
                  width={1}
                  zIndex={999}
                  bg="#eee"
                  position="absolute"
                  pt={3}
                  px={4}
                  bottom={0}
                  left={0}
                >
                  <AddNewMessageComponent
                    mutation={AddNewMessageDocument}
                    // variables={{ message: "ayyyyyyy" }}
                  >
                    {addNewMEssage => (
                      <Formik
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (data, { setErrors, resetForm }) => {
                          console.log("SUBMIT!!!");
                          console.log(JSON.stringify(data, null, 2));
                          addNewMEssage({
                            variables: {
                              message: data.message,
                              sentTo: "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5"
                            }
                          });
                          resetForm();
                        }}
                        initialValues={{
                          message: "",
                          sentTo: input.sentTo
                        }}
                      >
                        {({ handleSubmit }) => (
                          <form onSubmit={handleSubmit}>
                            <Field
                              id="message"
                              name="message"
                              placeholder="Type something..."
                              component={InputField}
                            />
                            <Field
                              id="sentTo"
                              name="sentTo"
                              type="hidden"
                              placeholder="Type something..."
                              component={InputField}
                            />
                            <Button type="submit">Submit</Button>
                          </form>
                        )}
                      </Formik>
                    )}
                  </AddNewMessageComponent>
                </AbBox>
                <Flex
                  flexDirection="column"
                  // border="lime"
                  width={1}
                  style={{ overflowY: "scroll", maxHeight: "80vh" }}
                  position="relative"
                >
                  <ViewMessagesPane
                    subscribeToMore={subscribeToMoreGetMessages}
                    subscriptionFunc={(
                      subscribeToMore,
                      variables,
                      scrollFunc
                    ) => {
                      subscribeToMore({
                        document: newMessageSub,
                        variables: {
                          message: subscribeToMoreInput.message,
                          sentTo: input.sentTo
                        },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;

                          const newFeedItem = subscriptionData.data.newMessage;

                          const {
                            subscribeToMoreInput: { message }
                          } = variables;

                          console.log(
                            "prev.getAllMyMessages".toUpperCase(),
                            prev.getAllMyMessages
                          );

                          console.log("newFeedItem".toUpperCase(), newFeedItem);

                          console.log("WHAT THE UPDATE IS PUBLISHING", {
                            getAllMyMessages: Object.assign(
                              {},
                              prev.getAllMyMessages,
                              {
                                format: [
                                  ...prev.getAllMyMessages.mappedMessages,
                                  newFeedItem
                                ]
                              }
                            )
                          });

                          return Object.assign({}, prev, {
                            getAllMyMessages: Object.assign(
                              {},
                              prev.getAllMyMessages,
                              {
                                mappedMessages: [
                                  ...prev.getAllMyMessages.mappedMessages,
                                  newFeedItem
                                ]
                              }
                            )
                          });
                        }
                      });
                      scrollFunc();
                    }}
                    variables={{ subscribeToMoreInput }}
                    loading={loadingGetMessages}
                    data={dataGetMessages}
                    error={errorGetMessages}
                  />
                </Flex>
              </Flex>
            </Flex>

            // DOWN HERE
          );
        }}
      </GetAllMyMessagesComponent>
    );
  }
}
