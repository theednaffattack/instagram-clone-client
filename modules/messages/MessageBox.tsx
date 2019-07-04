import React from "react";
import IconBase from "react-geomicons";
import { space } from "styled-system";
import styled from "styled-components";

import { Card, Flex, Text } from "./StyledRebass";

const Icon = styled(IconBase)`
  ${space}
`;

// const Box = styled(BoxBase)`
//   ${height}
// `;

export function MessageBox(props: any) {
  return (
    <Flex
      width={1}
      flexDirection="row"
      my={2}
      p={3}
      ml={props.me !== props.message.user.id ? "auto" : 0}
      mr={props.me === props.message.user.id ? "auto" : 0}
      width={4 / 5}
    >
      {props.me === props.message.user.id ? (
        <Flex
          height="40px"
          width="40px"
          mt={2}
          mr={3}
          bg="thread_footer"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
          style={{ borderRadius: "50%" }}
        >
          <Icon size="2em" name="user" fill="white" />
        </Flex>
      ) : (
        ""
      )}
      <Card
        my={2}
        p={3}
        color={props.me === props.message.user.id ? "thread_selected" : "white"}
        bg={
          props.me === props.message.user.id
            ? "chat_bubble_me"
            : "chat_bubble_them"
        }
        ml={props.me !== props.message.user.id ? "auto" : 0}
        mr={props.me === props.message.user.id ? "auto" : 0}
        width={1}
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
        <Text>{props.message.created_at}</Text>
        <Text>{props.message.message}</Text>
      </Card>
      {props.me !== props.message.user.id ? (
        <Flex
          height="40px"
          width="40px"
          mt={2}
          ml={3}
          bg="thread_footer"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
          style={{
            borderRadius: "50%"
          }}
        >
          <Icon size="2em" name="user" fill="white" />
        </Flex>
      ) : (
        ""
      )}

      {/* <Flex
        bg={props.me === props.message.user.id ? "chat_bubble_me" : "yellow"}
        // border={props.me === props.message.user.id ? "purp" : "crimson"}
        ml={props.me !== props.message.user.id ? "auto" : 0}
        mr={props.me === props.message.user.id ? "auto" : 0}
        width={1 / 2}
      >
        <Text>{props.message.created_at}</Text>
        <Text>{props.message.message}</Text>
      </Flex> */}
    </Flex>
  );
}
