import React from "react";
import Icon from "react-geomicons";

import { Flex, Text } from "./StyledRebass";

export function LastMessage({ message }) {
  return (
    <Flex width={[1, 1, 1]}>
      <Flex ml={3} flexDirection="column" justifyContent="center">
        <Icon name="user" fill="white" size="2em" />
      </Flex>

      <Flex width={1} p={3} flexDirection="column">
        <Text fontWeight="600">
          {message.messages[message.messages.length - 1].sentBy.firstName}{" "}
          {message.messages[message.messages.length - 1].sentBy.lastName}
        </Text>
        <Text>{message.messages[message.messages.length - 1].message}</Text>
      </Flex>
    </Flex>
  );
}

export function MappedMessage(data) {
  return data.data.map((message, index) => {
    return (
      <div
        key={`${message.__typename}-${message.id}`}
        style={{ border: "2px crimson dashed" }}
      >
        <Text>{message.id}</Text>
        <Text>{message.user.firstName}</Text>
        <Text>{message.message}</Text>
      </div>
    );
  });
}

export function MappedThreads({ data, handleThreadSelection, selectedThread }) {
  return data.map((thread, index) => {
    return (
      <Flex
        bg={selectedThread === index ? "#363657" : "#545281"}
        // bg="#545281"
        width={[1, 1, 1]}
        key={`${index}-${thread.__typename}`}
        onClick={() =>
          handleThreadSelection({ index, key: `${index}-${thread.__typename}` })
        }
      >
        <LastMessage message={thread} />
      </Flex>
    );
  });
}
