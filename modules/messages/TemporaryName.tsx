import React from "react";
import { Box as BoxBase } from "rebass";
import styled from "styled-components";
import { minHeight } from "styled-system";

// import { IncomingMessageBubble } from "./IncomingMessageBubble";
import { IncomingMessageBubble as V2 } from "./IncomingMessageBubbleNew";
import { TemporaryNameProps, MessageBody } from "./types";

const styles = {
  exampleText: {
    width: 200
  },
  range: {
    marginLeft: 25,
    width: 275
  },
  svg: {
    height: 125,
    display: "block",
    border: "1px solid #aaa",
    marginBottom: 10
  }
};

const Box = styled(BoxBase)`
  ${minHeight}
`;

export const TemporaryName = ({
  arrayOfMessages,
  me,
  selectedMessageId
}: TemporaryNameProps) => {
  return (
    selectedMessageId &&
    arrayOfMessages
      .filter(x => x.id === selectedMessageId)[0]
      .messages.map((message: MessageBody, index: number) => (
        // <IncomingMessageBubbleNew
        //   key={`${index}-${message.id}`}
        //   {...message}
        // />
        <Box minHeight={[1]} key={`${index}-${message.id}`} width={[1, 1 / 2]}>
          {me.firstName} {me.lastName}
          <V2
            x={33.051998138427734}
            y={19.666000366210938}
            width={247}
            styles={styles}
            passIndex={index}
            {...message}
          />
        </Box>
      ))
  );
};
