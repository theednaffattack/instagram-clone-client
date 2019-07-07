import React from "react";

import { CoverFlex, Flex, MyInput, Text, AbWrapper } from "./StyledRebass";
import { ChooseThreadUser } from "./ChooseThreadUser";
import { MinButton } from "./ThreadBody";
import { MenuDots } from "./MenuIcon";
import { MessageBox } from "./MessageBox";
import { GetListToCreateThreadComponent } from "../../generated/apolloComponents";
import ChatForm from "./chat-form";

interface IChatBodyProps {
  chatEmoji: string;
  chatInput: string;
  selectedThreadId: any;
  selectedThreadIndex: number;
  handleChatMenuClick: any;
  me: any;
  dataMessageThreads: any;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleChatFieldChange: any;
  handleUploadFileClick: any;
  emojiPickerVisible: boolean;
}

const ChatBody = React.forwardRef(
  (
    {
      chatEmoji,
      chatInput,
      selectedThreadId,
      selectedThreadIndex,
      handleChatMenuClick,
      dataMessageThreads,
      me,
      emojiPickerVisible,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      handleUploadFileClick,
      handleChatFieldChange
    }: IChatBodyProps,
    ref
  ) => {
    return (
      // CHAT
      <Flex width={[1, 1, 1 / 2]} flexDirection="column" alignItems="center">
        <Flex
          flex="0 0 auto"
          bg="chat_header"
          width={[1, 1, 1]}
          alignItems="center"
        >
          <Flex flexDirection="column" mr="auto">
            {selectedThreadId !== null ? (
              <>
                <GetListToCreateThreadComponent>
                  {({
                    data: dataCreateThread,
                    loading: loadingCreateThread,
                    error: errorCreateThread
                  }) => {
                    // if (error) return <div>some error: {error}</div>;
                    // if (loading) return <div>loading...</div>;
                    // return <div>hello data{JSON.stringify(data)}</div>;
                    return (
                      <div>
                        <ChooseThreadUser
                          dataCreateThread={
                            dataCreateThread.getListToCreateThread &&
                            dataCreateThread.getListToCreateThread
                              .thoseICanMessage
                          }
                          loadingCreateThread={loadingCreateThread}
                          errorCreateThread={errorCreateThread}
                          messages={
                            selectedThreadIndex !== null
                              ? dataMessageThreads[selectedThreadIndex].messages
                              : []
                          }
                        />
                      </div>
                    );
                  }}
                </GetListToCreateThreadComponent>
              </>
            ) : (
              ""
            )}
          </Flex>

          <MinButton
            width="58px"
            minHeight="100%"
            // px={3}
            bg="#545281"
            type="button"
            onClick={handleChatMenuClick}
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
          {selectedThreadIndex !== null &&
          selectedThreadIndex !== "undefined" &&
          selectedThreadIndex !== "" ? (
            dataMessageThreads[selectedThreadIndex].messages.map(
              (message: any, index: number) => (
                <MessageBox
                  key={`${index}-${message.id}-${message.__typename}`}
                  message={message}
                  me={me}
                />
              )
            )
          ) : (
            <Text fontSize="2em">no thread index selected</Text>
          )}
          {chatEmoji}
          <div
            style={{
              color: "black",
              float: "left",
              clear: "both",
              border: "1px limegreen dashed",
              justifySelf: "flex-end"
            }}
            ref={ref}
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
          <ChatForm
            chatEmoji={chatEmoji}
            chatInput={chatInput}
            handleChatFieldChange={handleChatFieldChange}
            emojiPickerVisible={emojiPickerVisible}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            handleUploadFileClick={handleUploadFileClick}
            sentTo={
              selectedThreadIndex !== null
                ? dataMessageThreads[selectedThreadIndex].messages[
                    dataMessageThreads[selectedThreadIndex].messages.length - 1
                  ].sentBy.id
                : ""
            }
            threadId={selectedThreadId ? selectedThreadId : ""}
          />
        </CoverFlex>
      </Flex>
    );
  }
);

export default ChatBody;
