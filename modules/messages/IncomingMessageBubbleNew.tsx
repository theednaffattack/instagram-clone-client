import React from "react";
import { Box, Card, Text } from "rebass";
import { MessageBody } from "./types";
import { StyledHR } from "./StyledRebass";
// import { ViewProps } from "./StyledRebass";
import { getTimeWords } from "./utilities";

const gradient: string =
  "linear-gradient( 0deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%)";

export const IncomingMessageBubble = ({
  title,
  message,
  id,
  createdAt
}: MessageBody) => {
  return (
    <Card
      color="white"
      px={0}
      pb={2}
      ml={[3, 5]}
      my={3}
      boxShadow="0px 13px 33px 0px rgba(0, 0, 0, 0.1)"
      borderRadius="17px"
      backgroundImage={gradient}
    >
      <Box py={3} px={4}>
        <Text>{title}</Text>
        <Text>({id})</Text>
      </Box>
      <StyledHR />
      <Box py={3} px={4}>
        <Text fontSize={[3]}>{message}</Text>
      </Box>
      <Card
        borderRadius="17px"
        width="180px"
        bg="rgba(0,0,0,0.125)"
        py={1}
        px={2}
        ml={3}
      >
        <Text textAlign="center" fontSize={[1]}>
          {getTimeWords(createdAt)}
        </Text>
      </Card>
    </Card>
  );
};
