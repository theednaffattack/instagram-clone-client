import React from "react";
import { Image, Text } from "rebass";
import distanceInWords from "date-fns/distance_in_words";

import { Flex, Box, Dot, AbBox } from "./StyledRebass";
import { MessageThreadProperties } from "./types";
import { truncate, getTimeWords } from "./utilities";

export const MessageThreadItem = ({
  avatar,
  id,
  handleSelectMessageThread,
  handleSelectArchivedMessageThread,
  last,
  messages,
  messageIndex,
  name
}: MessageThreadProperties) => {
  return (
    <Flex
      id={id}
      onClick={
        handleSelectMessageThread
          ? handleSelectMessageThread
          : handleSelectArchivedMessageThread
      }
      py={3}
      alignItems="center"
      width={1}
      borderBottom={last ? "" : "2px #eee solid"}
    >
      <Box position="relative">
        <Image borderRadius="17px" src={avatar} />
        <AbBox
          width="40px"
          p={0}
          bottom={0}
          right={-18}
          position="absolute"
          zIndex={990}
        >
          <Dot />
        </AbBox>
      </Box>
      <Flex pl={3} width={1}>
        <Flex width={1} flexDirection="column">
          <Box>
            <Text fontWeight={600}>{name}</Text>
          </Box>
          <Box color="muted">
            {truncate(messages[0].messageText, 45, " 🎶")}
          </Box>
        </Flex>
        <Flex
          alignItems="start"
          justifyContent="flex-end"
          width={1 / 4}
          ml="auto"
          color="muted"
        >
          <Text fontSize={[".8em"]} color="muted" fontWeight={600}>
            {getTimeWords(
              new Date(messages[0].timestamp),
              new Date()
            ).toUpperCase()}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
