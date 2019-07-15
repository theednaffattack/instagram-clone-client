import React from "react";
import styled from "styled-components";
import IconBase from "react-geomicons";
import {
  borders,
  color,
  fontSize,
  minHeight,
  space,
  width
} from "styled-system";

import { Button, Flex, Heading, Text, CoverFlex } from "./StyledRebass";
import { MappedThreads } from "./OtherFunctions";

export const Icon = styled(IconBase)`
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

interface IThreadBodyProps {
  data: any;
  handleThreadMenuClick: any;
  selectedThreadIndex: any;
  handleThreadSelection: any;
  handleThreadAddThreadClick: any;
  selectedThread: any;
}

function ThreadBody({
  data,
  handleThreadMenuClick,
  selectedThreadIndex,
  handleThreadSelection,
  handleThreadAddThreadClick,
  selectedThread
}: IThreadBodyProps) {
  return (
    <Flex
      bg="thread_bg"
      flex="1 1 auto"
      flexDirection="column"
      width={[1 / 5, 1 / 5, 1 / 5]}
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
            onClick={handleThreadMenuClick}
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
            color="#b2b2d8"
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
            onClick={handleThreadAddThreadClick}
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
          selectedThread={selectedThread}
          handleThreadSelection={handleThreadSelection}
          data={data && data.getMessageThreads ? data.getMessageThreads : []}
        />
      </Flex>
      <CoverFlex
        position="absolute"
        width={[1, 1, 1 / 5]}
        bottom={0}
        p={3}
        justifySelf="flex-end"
        flexDirection="column"
        bg="thread_footer"
      >
        Thread Footer
      </CoverFlex>
    </Flex>
  );
}

export default ThreadBody;
