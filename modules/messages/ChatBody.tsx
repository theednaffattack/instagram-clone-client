import React from "react";

import dynamic from "next/dynamic";

import { CoverFlex, Flex, Text } from "./StyledRebass";
import { ChooseThreadUser } from "./ChooseThreadUser";
import { MinButton } from "./ThreadBody";
import { MenuDots } from "./MenuIcon";
import { MessageBox } from "./MessageBox";
import { GetListToCreateThreadComponent } from "../../generated/apolloComponents";
import ChatForm from "./chat-form";
import { IChatBodyProps } from "./types";
import UserProfileImage from "./UserProfileImage";
import AuthenticatedHeader from "../../components/AuthHeader";

const AddressBookMutation = dynamic({
  loader: () => import("./AddressBookMutation") as any
});

const ChatBody = React.forwardRef(
  (
    {
      chatEmoji,
      chatInput,
      disabled,
      handleThreadAddThreadClick,
      handleThreadSelection,
      handleAddInviteeToThread,
      handleRemoveInviteeToThread,
      selectedThreadId,
      selectedThreadIndex,
      showMessagingAddressBook,
      handleChatMenuClick,
      dataMessageThreads,
      me,
      emojiPickerVisible,
      newThreadInvitees,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      handleUploadFileClick,
      handleChatFieldChange,
      newThreadDisabled
    }: IChatBodyProps,
    ref
  ) => {
    // const getSentby =
    //   selectedThreadIndex &&
    //   dataMessageThreads &&
    //   dataMessageThreads[selectedThreadIndex]
    //     ? dataMessageThreads[selectedThreadIndex].messages[
    //         dataMessageThreads[selectedThreadIndex].messages.length - 1
    //       ].sentBy.firstName
    //     : "";

    const getNewInvitees =
      newThreadInvitees && newThreadInvitees[0]
        ? newThreadInvitees.map((person: any, index: number) => (
            <UserProfileImage
              handleRemoveInviteeToThread={handleRemoveInviteeToThread}
              key={index}
              color="#b2b2d8"
              user={person}
              buttonThing={true}
            />
            // <Heading key={index}>
            //   <Icon mx={2} name="user" fill="white" size=".8em" />
            //   {person.firstName} {person.lastName}
            // </Heading>
          ))
        : "";

    return (
      // CHAT
      <Flex
        width={[4 / 5, 4 / 5, 4 / 5]}
        flexDirection="column"
        alignItems="center"
      >
        <AuthenticatedHeader bg="#5d5c8d" />
        <Flex
          flex="0 0 auto"
          bg="chat_header"
          width={[1, 1, 1]}
          alignItems="center"
        >
          <Flex width={[1, 1, 1]} flexDirection="column" mr="auto">
            <Flex>
              {selectedThreadIndex
                ? dataMessageThreads.getMessageThreads[
                    selectedThreadIndex
                  ].invitees.map((person, index) => (
                    <UserProfileImage
                      handleRemoveInviteeToThread={handleRemoveInviteeToThread}
                      key={index}
                      color="#b2b2d8"
                      user={person}
                      buttonThing={false}
                    />
                  ))
                : ""}
            </Flex>

            {selectedThreadId === null ? (
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
                      <Flex width={[1, 1, 1]} flexDirection="row">
                        {selectedThreadIndex && dataCreateThread ? (
                          <ChooseThreadUser
                            dataCreateThread={
                              dataCreateThread.getListToCreateThread &&
                              dataCreateThread.getListToCreateThread
                                .thoseICanMessage
                            }
                            loadingCreateThread={loadingCreateThread}
                            errorCreateThread={errorCreateThread}
                            messages={
                              dataMessageThreads.getMessageThreads &&
                              dataMessageThreads.getMessageThreads[
                                selectedThreadIndex
                              ]
                                ? dataMessageThreads.getMessageThreads[
                                    selectedThreadIndex
                                  ].messages
                                : []
                            }
                          />
                        ) : (
                          <>
                            {newThreadInvitees && newThreadInvitees[0]
                              ? getNewInvitees
                              : ""}
                          </>
                        )}
                      </Flex>
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
          justifyContent={selectedThreadIndex ? "flex-end" : "center"} // HERE
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
          selectedThreadIndex !== "" &&
          dataMessageThreads.getMessageThreads[selectedThreadIndex] ? (
            dataMessageThreads.getMessageThreads[
              selectedThreadIndex
            ].messages.map((message: any, index: number) => (
              <MessageBox
                key={`${index}-${message.id}-${message.__typename}`}
                message={message}
                me={me}
              />
            ))
          ) : (
            <>
              {!showMessagingAddressBook ? (
                <Text fontSize="2em">select a thread to view messages</Text>
              ) : (
                <Text fontSize="2em">New Message Thread</Text>
              )}
              <div>
                {/* Load on demand */}
                {showMessagingAddressBook && (
                  <AddressBookMutation
                    handleAddInviteeToThread={handleAddInviteeToThread}
                    dataMessageThreads={dataMessageThreads}
                    selectedThreadIndex={selectedThreadIndex}
                    buttonThing={true}
                  />
                )}
              </div>
            </>
          )}
          {chatEmoji}
          <div
            style={{
              color: "black",
              float: "left",
              clear: "both",
              // border: "1px limegreen dashed",
              width: "100%"
              // justifySelf: "flex-end",
              // height: "300px"
            }}
            ref={ref}
          />
        </Flex>
        <CoverFlex
          position="absolute"
          width={[1, 1, 4 / 5]}
          bottom={0}
          alignItems="flex-end"
          p={0}
          flexDirection="row"
          bg="white"
          color="thread_text"
        >
          <ChatForm
            handleThreadSelection={handleThreadSelection}
            disabled={disabled}
            chatEmoji={chatEmoji}
            chatInput={chatInput}
            handleChatFieldChange={handleChatFieldChange}
            emojiPickerVisible={emojiPickerVisible}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            handleUploadFileClick={handleUploadFileClick}
            selectedThreadId={selectedThreadId}
            sentTo={
              selectedThreadIndex !== null &&
              dataMessageThreads.getMessageThreads &&
              dataMessageThreads.getMessageThreads[selectedThreadIndex]
                ? dataMessageThreads.getMessageThreads[selectedThreadIndex]
                    .messages[
                    dataMessageThreads.getMessageThreads[selectedThreadIndex]
                      .messages.length - 1
                  ].sentBy.id
                : ""
            }
            threadId={selectedThreadId ? selectedThreadId : ""}
            newThreadInvitees={
              selectedThreadIndex
                ? dataMessageThreads.getMessageThreads[selectedThreadIndex]
                    .invitees
                : []
            }
            newThreadDisabled={newThreadDisabled}
          />
        </CoverFlex>
      </Flex>
    );
  }
);

export default ChatBody;
