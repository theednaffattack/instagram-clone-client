import React from "react";
import IconBase from "react-geomicons";
import {
  border,
  borders,
  color,
  fontSize,
  space,
  maxHeight,
  minHeight,
  minWidth,
  width,
  alignSelf
} from "styled-system";
import styled from "styled-components";
import { Box as BoxBase, Button } from "rebass";

import { MESSAGE_THREADS } from "../../graphql/user/subscriptions/MessageThreads";
import { Flex, Heading, Text, CoverFlex } from "./StyledRebass";
import { MappedThreads } from "./OtherFunctions";
import { MessageBox } from "./MessageBox";
import AuthenticatedHeader from "../../components/AuthHeader";
import CustomIconBase from "./CustomIcon";
import { MenuDots as MenuDotsBase } from "./MenuIcon";
import CustomIconMicBase from "./CustomIconMic";
import IconAddFile from "./icon-add-file";

const MenuDots = styled(MenuDotsBase)`
  ${space}
`;

export const Box = styled(BoxBase)`
  ${maxHeight}
  ${minHeight}
  ${minWidth}
  ${borders}
`;

export const BigLi = styled.li`
  text-decoration: none;
  display: inline-block;
`;

export const IconMic = styled(CustomIconMicBase)`
  ${space}
`;

export const Icon = styled(IconBase)`
  ${space}
`;

export const CustomIcon = styled(CustomIconBase)`
  ${space}
`;

export const MinButton = styled(Button)`
  ${minHeight}
  ${space}
`;
export const ThreadInput = styled.input`
  ${borders}
  ${color}
  ${fontSize}
  ${space}
  ${width}

/* ::placeholder, */
&::-webkit-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
:-ms-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
`;

export const MyInput = styled.input`
  ${borders}
  ${color}
  ${fontSize}
  ${space}
  ${width}

& ::placeholder,
::-webkit-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
:-ms-input-placeholder {
  color: red;
}
`;

// #504aa4

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
    console.log("VIEW SLELECTION", selection);
    console.log(
      "VIEW SELECTEDTHREAD",
      selectedThreadIndex
      //   this.props.data.getMessageThreads[selection.index]
    );
    this.setState({
      selectedThread: selection.index
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
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
          updateQuery: (prev, { subscriptionData }) => {
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

    this.scrollToBottom();
    console.log("MOUNTED, COMPONENT SHOULD HAVE SCROLLED");
    console.log("REF FOUND?, ", this.messagesEnd);
    console.log("THIS?, ", this);
  }
  componentDidUpdate() {
    this.scrollToBottom();
    console.log("UPDATED, COMPONENT SHOULD HAVE SCROLLED");
    console.log("REF FOUND?, ", this.messagesEnd);
  }

  render() {
    const { data } = this.props;
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
          <Flex
            bg="thread_bg"
            flex="1 1 auto"
            flexDirection="column"
            width={[1, 1, 1 / 2]}
          >
            <Flex bg="thread_header" flexDirection="column">
              <Flex alignItems="center">
                <Heading p={3} mr="auto">
                  Thread Header
                </Heading>
                <MinButton
                  width="45px"
                  mr={3}
                  bg="transparent"
                  type="button"
                  onClick={this.handleThreadMenuClick}
                  style={{
                    padding: 0
                  }}
                >
                  <Icon size="1.7em" fill="#b2b2d8" name="list" />
                </MinButton>
              </Flex>
              <Flex
                p={0}
                bg="thread_bg"
                borderBottom="1px rgba(255,255,255, 0.2) solid"
                alignItems="center"
              >
                <Icon mx={3} name="search" fill="#b2b2d8" />

                <ThreadInput
                  type="text"
                  border={0}
                  color="#e1ddff"
                  mr="auto"
                  p={2}
                  fontSize="1em"
                  bg="#3F3C62"
                  placeholder="Search"
                />

                <MinButton
                  width="45px"
                  //   minHeight="35px"
                  //   border="lime"
                  mr={3}
                  p={0}
                  color="#b2b2d8"
                  fontSize="2em"
                  fontWeight="200"
                  bg="transparent"
                  type="button"
                  onClick={this.handleThreadAddThreadClick}
                  style={{
                    padding: 0,
                    paddingBottom: "4px"
                  }}
                >
                  +
                </MinButton>
              </Flex>
            </Flex>
            <Flex
              flex="1 1 auto"
              flexDirection="column"
              style={{
                overflowY: "auto"
              }}
            >
              <MappedThreads
                selectedThread={this.state.selectedThread}
                handleThreadSelection={this.handleThreadSelection}
                data={
                  data && data.getMessageThreads ? data.getMessageThreads : []
                }
              />
            </Flex>
            <CoverFlex
              position="absolute"
              width={[1, 1, 1 / 2]}
              bottom={0}
              p={3}
              justifySelf="flex-end"
              flexDirection="column"
              bg="thread_footer"
            >
              Thread Footer
            </CoverFlex>
          </Flex>
          <Flex
            width={[1, 1, 1 / 2]}
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              flex="0 0 auto"
              bg="chat_header"
              width={[1, 1, 1]}
              alignItems="center"
            >
              <Heading
                as="h3"
                color="chat_icon"
                fontWeight="200"
                p={3}
                mr="auto"
              >
                Amy DiNato
              </Heading>

              <MinButton
                width="58px"
                minHeight="100%"
                // px={3}
                bg="#545281"
                type="button"
                onClick={this.handleChatMenuClick}
                // style={{
                //   padding: 0
                // }}
              >
                <MenuDots mx="auto" size="2em" fill="rgba(255,255,255,0.6)" />
              </MinButton>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width={[1, 1, 1]}
              flex="1 1 auto"
              bg="chat_bg"
              style={{
                overflowY: "auto"
              }}
            >
              {this.state.selectedThread !== null &&
              this.state.selectedThread !== "undefined" ? (
                data.getMessageThreads[this.state.selectedThread].messages.map(
                  (message: any, index: number) => (
                    <MessageBox
                      key={`${index}-${message.id}-${message.__typename}`}
                      message={message}
                      me={this.props.me}
                    />
                  )
                )
              ) : (
                <Text fontSize="2em">no thread index selected</Text>
              )}
              <div
                style={{
                  color: "black",
                  float: "left",
                  clear: "both",
                  border: "1px limegreen dashed",
                  justifySelf: "flex-end"
                }}
                ref={el => {
                  this.messagesEnd = el;
                  console.log("element", el);
                }}
              />
            </Flex>
            <CoverFlex
              position="absolute"
              width={[1, 1, 1 / 2]}
              bottom={0}
              alignItems="center"
              p={0}
              flexDirection="row"
              bg="white"
              color="thread_text"
            >
              <MyInput
                placeholder="Type something to send..."
                type="text"
                color="#504aa4"
                border={0}
                width={[1, 1, 1]}
                mr="auto"
                p={3}
                fontSize="1em"
              />
              <MinButton
                onClick={this.handleUploadFileClick}
                bg="transparent"
                minHeight="35px"
                width="3.5em"
                style={{ padding: 0 }}
              >
                <IconAddFile fill="#b2b2d8" size="1.4em" name="add-file" />
              </MinButton>
              <MinButton
                onClick={this.handleSelectEmojiClick}
                bg="transparent"
                minHeight="35px"
                ml={[2, 2, 2]}
                width="3.5em"
                style={{ padding: 0 }}
              >
                <CustomIcon width="1.6em" fill="#b2b2d8" />
              </MinButton>
              <MinButton
                onClick={this.handleEngageMicrophoneClick}
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
            </CoverFlex>
          </Flex>
        </Flex>
      </CoverFlex>
    );
  }
}
