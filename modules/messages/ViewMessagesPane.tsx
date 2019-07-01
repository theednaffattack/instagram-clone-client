import React, { Component } from "react";
import { Text } from "rebass";
import { GlobalSVGGradient } from "./GlobalSVGGradient";
// import { MessageThreadProps, MessagePageState } from "./types";
// import CurrentMessagesPane from "./CurrentMessagesPane";
import { IncomingMessageBubble } from "./IncomingMessageBubbleNew";
import { Flex } from "./StyledRebass";

import { newMessageSub } from "../../graphql/message/subscriptions/NewMessage";

export default class ViewMessagesPane extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.props.subscriptionFunc(
      this.props.subscribeToMore,
      this.props.variables,
      this.scrollToBottom
    );
  }
  render() {
    const {
      data: getMessageData,
      loading: getMessageLoading,
      error: getMessageError,
      subscribeToMore,
      subscriptionFunc,
      variables: { subscribeToMoreInput }
    } = this.props;
    return (
      <Flex>
        <GlobalSVGGradient />
        {/* {error ? error.message : ""} */}
        <div>
          {/* {JSON.stringify(getMessageData.getAllMyMessages.mappedMessages)} */}
          {getMessageData!.getAllMyMessages!.mappedMessages.map(
            (message: any, index: number) => (
              <IncomingMessageBubble
                subscriptionsFunc={subscriptionFunc}
                subscribeToMore={subscribeToMore}
                key={index}
                {...message}
              />
            )
          )}
          <div
            style={{
              color: "white",
              marginTop: "80px",
              float: "left",
              clear: "both"
            }}
            ref={el => {
              this.messagesEnd = el;
            }}
          >
            .
          </div>
        </div>
      </Flex>
    );
  }
}
