import React, { Fragment } from "react";
import posed from "react-pose";
import styled from "styled-components";

import { Heading, Text, Flex } from "./StyledRebass";
import { Button } from "rebass";

const ContentBase = posed.div({
  closed: { height: 0 },
  open: { height: "auto" }
});

const Content = styled(ContentBase)`
  overflow: hidden;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.8);
`;
const ListBase = posed.li({
  closed: { height: 0 },
  open: { height: "auto" }
});

const LiContent = styled(ListBase)`
  overflow: hidden;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.8);
  list-style: none;
  width: 100%;
`;

export interface IChooseThreadUserState {
  open: boolean;
  accordionIndex: number | null;
}

export interface IChooseThreadUserProps {
  messages: any[];
  dataCreateThread: any;
  loadingCreateThread: any;
  errorCreateThread: any;
  handleAddInviteeToThread: any;
}

export class ChooseThreadUser extends React.Component<
  IChooseThreadUserProps,
  IChooseThreadUserState
> {
  constructor(props: IChooseThreadUserProps) {
    super(props);

    this.state = { open: false, accordionIndex: null };
  }

  render() {
    const { open } = this.state;
    const {
      dataCreateThread,
      loadingCreateThread,
      errorCreateThread,
      handleAddInviteeToThread,
      messages
    } = this.props;

    const lastMessenger = messages[messages.length - 1];
    console.log("view last messenger".toUpperCase(), messages);

    return (
      <Fragment>
        <Heading
          as="h3"
          color="chat_icon"
          fontWeight="200"
          p={3}
          mr="auto"
          onClick={() =>
            this.setState({
              open: !open
            })
          }
        />
        <Flex width={[1, 1, 1]} flexDirection="column">
          {/* <Content className="content" pose={open ? "open" : "closed"}> */}
          {loadingCreateThread ? <Text>not loading</Text> : ""}
          {errorCreateThread ? <Text>no error</Text> : ""}
          {dataCreateThread ? (
            dataCreateThread.map((person, index) => (
              // <pre key={person.id}>{JSON.stringify(person, null, 2)}</pre>

              <Flex
                border="2px #b2b2d8 solid"
                key={`select-msg-receiver_${index}`}
                alignItems="center"
                width={["300px", "300px", "300px"]}
                p={2}
                my={1}
                bg="white"
              >
                <Text fontSize="1.8em" width={[2 / 3, 2 / 3, 2 / 3]} mr="auto">
                  {person.firstName} {person.lastName}
                </Text>
                <Button
                  onClick={() => handleAddInviteeToThread({ user: person })}
                  type="button"
                  bg="#736eab"
                >
                  +
                </Button>
              </Flex>
            ))
          ) : (
            <Text>no data</Text>
          )}
          {/* </Content> */}
        </Flex>
      </Fragment>
    );
  }
}
