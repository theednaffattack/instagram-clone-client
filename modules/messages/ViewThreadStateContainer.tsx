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
  emojiPickerVisible: boolean;
  chatInput: string;
  chatEmoji: string;
}

export class ViewThreadStateContainer extends React.Component<
  IViewThreadStateContainerProps,
  IViewThreadStateContainerState
> {
  messagesEnd: React.RefObject<HTMLElement>;
  constructor(props: IViewThreadStateContainerProps) {
    super(props);

    this.handleThreadSelection = this.handleThreadSelection.bind(this);
    this.handleThreadMenuClick = this.handleThreadMenuClick.bind(this);
    this.handleThreadAddThreadClick = this.handleThreadAddThreadClick.bind(
      this
    );
    this.handleUploadFileClick = this.handleUploadFileClick.bind(this);
    this.handleUploadFileClick = this.handleUploadFileClick.bind(this);
    this.handleChatMenuClick = this.handleChatMenuClick.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleOpenEmojiMenuClick = this.handleOpenEmojiMenuClick.bind(this);

    this.messagesEnd = React.createRef();
  }
  state = {
    selectedThread: null,
    myThreadId: "97798d95-04d9-4147-8913-30b7124abc95",
    emojiPickerVisible: false,
    chatInput: "",
    chatEmoji: ""
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

  handleOpenEmojiMenuClick() {
    console.log("handleSelectEmojiClick 🙂");
    this.setState(prevState => ({
      emojiPickerVisible: !prevState.emojiPickerVisible
    }));
  }

  handleEngageMicrophoneClick() {
    console.log("handleEngageMicrophoneClick");
  }

  handleChatMenuClick() {
    console.log("handleChatMenuClick");
  }

  componentDidMount() {
    const threadIdList = this.props.data.getMessageThreads.map(
      thread => thread.id
    );
    threadIdList.map(threadIdThing =>
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
            console.log("subscriptionData".toUpperCase(), subscriptionData);
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

    const selectedThreadId = 0;
    // this.state.selectedThread
    //   ? this.props.data.getMessageThreads[this.state.selectedThread].id
    //   : null;

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
          {/* {JSON.stringify(data.getMessageThreads[2])} */}

          <ChatBody
            dataMessageThreads={this.props.data.getMessageThreads}
            chatEmoji={this.state.chatEmoji}
            chatInput={this.state.chatInput}
            selectedThreadIndex={this.state.selectedThread}
            selectedThreadId={
              this.state.selectedThread === 0 || this.state.selectedThread
                ? this.props.data.getMessageThreads[this.state.selectedThread]
                    .id
                : null
            }
            emojiPickerVisible={this.state.emojiPickerVisible}
            handleChatMenuClick={this.handleChatMenuClick}
            me={this.props.me}
            handleEngageMicrophoneClick={this.handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={this.handleOpenEmojiMenuClick}
            handleSelectEmojiClick={this.handleSelectEmojiClick}
            handleChatFieldChange={this.handleChatFieldChange}
            handleUploadFileClick={this.handleUploadFileClick}
            ref={this.messagesEnd}
          />
        </Flex>
      </CoverFlex>
    );
  }
}
