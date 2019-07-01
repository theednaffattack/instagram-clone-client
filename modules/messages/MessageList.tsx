import React from "react";
import { Card, Text } from "rebass";

import { MessageThreadItem } from "./MessageThreadItem";
import { activeMessageThreads, archivedMessageThreads } from "./mockData";
import { MessageThreadProps, MessagePageState } from "./types";

import { Box, Flex } from "./StyledRebass";

export const MessageList = ({
  handleSelectArchivedMessageThread,
  handleSelectMessageThread
}: any) => {
  return (
    <Flex mr={[0, 3]} width={[1, 1, 1]}>
      <Card
        p={3}
        width={1}
        bg="white"
        borderRadius="12px"
        boxShadow="0 27px 40px 0 rgba(0, 0, 0, 0.05)"
      >
        <Text fontSize={5}>Messages</Text>
        <Box borderTop="2px #eee solid">
          <Text pt={3} color="muted">
            ACTIVE NOW
          </Text>

          {activeMessageThreads.map(
            (item: MessageThreadProps, index: number, array: any[]) => (
              <MessageThreadItem
                id={item.id}
                last={index === array.length - 1}
                messageIndex={index}
                key={`${index}-${item.id}`}
                handleSelectMessageThread={handleSelectMessageThread}
                {...item}
              />
            )
          )}
          <Text pt={3} color="muted">
            ARCHIVES
          </Text>

          {archivedMessageThreads.map(
            (item: MessageThreadProps, index: number, array: any[]) => (
              <MessageThreadItem
                id={item.id}
                last={index === array.length - 1}
                messageIndex={index}
                key={`${index}-${item.id}`}
                handleSelectArchivedMessageThread={
                  handleSelectArchivedMessageThread
                }
                {...item}
              />
            )
          )}
        </Box>
      </Card>
    </Flex>
  );
};
