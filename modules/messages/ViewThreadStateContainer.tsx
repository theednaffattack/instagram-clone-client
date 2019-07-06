import React from "react";

import { CoverFlex, Flex, Text } from "./StyledRebass";
import { MESSAGE_THREADS } from "../../graphql/user/subscriptions/MessageThreads";
import AuthenticatedHeader from "../../components/AuthHeader";
import ThreadBody from "./ThreadBody";
import ChatBody from "./ChatBody";

export interface IViewThreadStateContainerProps {
  data: any;
  loading: any;
  error: any;
  subscribeToMore: any;
  threadIdList: string[];
}

export interface IViewThreadStateContainerState {
  selectedThread: number | null;
  myThreadId: string;
}

export class ViewThreadStateContainer extends React.Component<
  IViewThreadStateContainerProps,
  IViewThreadStateContainerState
> {
  constructor(props: IViewThreadStateContainerProps) {
    super(props);

    this.handleThreadSelection = this.handleThreadSelection.bind(this);
    this.handleThreadMenuClick = this.handleThreadMenuClick.bind(this);
    this.handleThreadAddThreadClick = this.handleThreadAddThreadClick.bind(
      this
    );
    this.handleUploadFileClick = this.handleUploadFileClick.bind(this);
    this.handleSelectEmojiClick = this.handleSelectEmojiClick.bind(this);
    this.handleUploadFileClick = this.handleUploadFileClick.bind(this);
    this.handleChatMenuClick = this.handleChatMenuClick.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.messagesEnd = React.createRef();
  }
  state = {
    selectedThread: null,
    myThreadId: "97798d95-04d9-4147-8913-30b7124abc95"
  };

  handleThreadSelection(selection) {
    const { data } = this.props;
    const selectedThreadIndex = this.props.data.getMessageThreads[
      selection.index
    ];

    this.setState({
      selectedThread: selection.index
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };

  handleThreadMenuClick() {
    console.log("handleThreadMenuClick");
  }

  handleThreadAddThreadClick() {
    console.log("handleThreadAddThreadClick");
  }

  handleUploadFileClick() {
    console.log("handleUploadFileClick");
  }

  handleSelectEmojiClick() {
    console.log("handleSelectEmojiClick 🙂");
  }

  handleEngageMicrophoneClick() {
    console.log("handleEngageMicrophoneClick");
  }

  handleChatMenuClick() {
    console.log("handleChatMenuClick");
  }

  componentDidMount() {
    this.props.threadIdList.map(threadIdThing =>
      this.props.subscribeToMore(
        // subscribeToMore(
        {
          document: MESSAGE_THREADS,
          variables: {
            data: {
              threadId: threadIdThing,
              sentTo: "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
              message: "hi bob"
            }
          },
          updateQuery: (prev: any, { subscriptionData }: any) => {
            if (!subscriptionData.data) return prev;

            let newMessageThreads = prev.getMessageThreads.map(
              (messageThread: any) => {
                // do stuff
                let messageThreadTrans = messageThread;
                if (threadIdThing === messageThread.id) {
                  messageThreadTrans.messages.push(
                    subscriptionData.data.messageThreads.message
                  );
                } else {
                  return messageThreadTrans;
                }
              }
            );
            if (!newMessageThreads) {
              throw Error("No message threads in previous cache!");
            }
            return prev;
          }
        }
        // )
      )
    );
    if (this.messagesEnd.current) {
      this.scrollToBottom();
    }
  }
  componentDidUpdate() {
    if (this.messagesEnd.current) {
      this.scrollToBottom();
    }
  }

  render() {
    const { data } = this.props;
    const threadIndex = this.state.selectedThread;
    const threads = this.props.data.getMessageThreads;

    if (threadIndex) {
      console.log("HELLO", threads[threadIndex]);
    }

    return (
      <CoverFlex
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg="black"
        color="thread_text"
        position="fixed"
        // width={[1, 1, 1]}
        flexDirection="column"
        pb="49px"
        style={{
          overflow: "hidden"
        }}
      >
        {/* works */}
        <Text>{this.state.selectedThread}</Text>
        {/* works */}
        <Text>{this.props.data.getMessageThreads[0].id}</Text>

        {/* DOESN'T WORK??? */}
        <Text>
          {this.state.selectedThread
            ? this.props.data.getMessageThreads[this.state.selectedThread].id
            : ""}
        </Text>
        <Text>
          {this.state.selectedThread
            ? this.props.data.getMessageThreads[
                parseInt(this.state.selectedThread)
              ].id
            : ""}
        </Text>
        <Text>
          {this.state.selectedThread
            ? this.props.data.getMessageThreads[this.state.selectedThread].id
            : ""}
        </Text>
        <AuthenticatedHeader bg="white" />
        <Flex
          bg="white"
          flex="1 1 auto"
          width={[1, 1, 1]}
          style={{
            overflow: "hidden"
          }}
        >
          <ThreadBody
            data={data}
            handleThreadMenuClick={this.handleThreadMenuClick}
            handleThreadSelection={this.handleThreadSelection}
            selectedThread={this.state.selectedThread}
            handleThreadAddThreadClick={this.handleThreadAddThreadClick}
          />
          <ChatBody
            dataMessageThreads={this.props.data.getMessageThreads}
            selectedThreadIndex={this.state.selectedThread}
            selectedThreadId={
              this.state.selectedThread === 0 || this.state.selectedThread
                ? this.props.data.getMessageThreads[this.state.selectedThread]
                    .id
                : null
            }
            handleChatMenuClick={this.handleChatMenuClick}
            me={this.props.me}
            handleEngageMicrophoneClick={this.handleEngageMicrophoneClick}
            handleSelectEmojiClick={this.handleSelectEmojiClick}
            handleUploadFileClick={this.handleUploadFileClick}
            ref={this.messagesEnd}
          />
        </Flex>
      </CoverFlex>
    );
  }
}
