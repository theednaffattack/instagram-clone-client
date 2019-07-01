import React, { Component } from "react";
import { TemporaryName } from "./TemporaryName";

const initialState = {
  messages: [{ id: "one" }, { id: "two" }, { id: "three" }]
};

interface Message {
  id: string;
}

interface CurrentMessagesPaneProps {
  messagesSelectorId: string;
  messages: Message[];
}

interface CurrentMessagesPaneState {
  messages: Message[];
}

export default class CurrentMessagesPane extends Component<
  CurrentMessagesPaneProps,
  CurrentMessagesPaneState
> {
  constructor(props: CurrentMessagesPaneProps) {
    super(props);
    this.state = {
      messages: initialState.messages
    };
  }
  render() {
    return (
      <TemporaryName
        me={this.props.me}
        arrayOfMessages={this.props.messages}
        selectedMessageId={this.props.messagesSelectorId}
      />
    );
  }
}
