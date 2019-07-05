import React from "react";

import { CoverFlex, Flex, MyInput, Text } from "./StyledRebass";
import { ChooseThreadUser } from "./ChooseThreadUser";
import { MinButton } from "./ThreadBody";
import { MenuDots } from "./MenuIcon";
import { MessageBox } from "./MessageBox";
import IconAddFile from "./icon-add-file";
import { GetListToCreateThreadComponent } from "../../generated/apolloComponents";

import { IconMic, CustomIcon } from "./StyledRebass";

interface IChatBodyProps {
  selectedThread: any;
  handleChatMenuClick: any;
  me: any;
  dataMessageThreads: any;
  handleEngageMicrophoneClick: any;
  handleSelectEmojiClick: any;
  handleUploadFileClick: any;
}

const ChatBody = React.forwardRef(
  (
    {
      selectedThread,
      handleChatMenuClick,
      dataMessageThreads,
      me,
      handleEngageMicrophoneClick,
      handleSelectEmojiClick,
      handleUploadFileClick
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
            simmons
            {selectedThread !== null ? (
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
                          messages={dataMessageThreads[selectedThread].messages}
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
          {selectedThread !== null && selectedThread !== "undefined" ? (
            dataMessageThreads[selectedThread].messages.map(
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
          <div
            style={{
              color: "black",
              float: "left",
              clear: "both",
              border: "1px limegreen dashed",
              justifySelf: "flex-end"
            }}
            ref={
              ref
              //   el
              //   => {
              //   passRef = el;
              //   console.log("setting ref on element", el);
              // }
            }
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
            onClick={handleUploadFileClick}
            bg="transparent"
            minHeight="35px"
            width="3.5em"
            style={{ padding: 0 }}
          >
            <IconAddFile fill="#b2b2d8" size="1.4em" name="add-file" />
          </MinButton>
          <MinButton
            onClick={handleSelectEmojiClick}
            bg="transparent"
            minHeight="35px"
            ml={[2, 2, 2]}
            width="3.5em"
            style={{ padding: 0 }}
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
        </CoverFlex>
      </Flex>
    );
  }
);

export default ChatBody;
