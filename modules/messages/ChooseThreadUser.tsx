import React, { Fragment } from "react";
import posed from "react-pose";
import styled from "styled-components";

import { Heading, Text, Flex } from "./StyledRebass";

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

interface IChooseThreadUserState {
  open: boolean;
  accordionIndex: number | null;
}

interface IChooseThreadUserProps {
  messages: any[];
  dataCreateThread: any;
  loadingCreateThread: any;
  errorCreateThread: any;
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
      messages,
      dataCreateThread,
      loadingCreateThread,
      errorCreateThread
    } = this.props;

    console.log("CHOOSETHREADUSER MOUNTED!");
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
        >
          {messages
            ? `${messages[0].user.firstName} ${messages[0].user.lastName}`
            : "blah"}
        </Heading>
        <Flex width={[1, 1, 1]} flexDirection="column">
          <Content className="content" pose={open ? "open" : "closed"}>
            {loadingCreateThread ? <Text>not loading</Text> : ""}
            {errorCreateThread ? <Text>no error</Text> : ""}
            {dataCreateThread ? (
              dataCreateThread.map(person => (
                // <pre key={person.id}>{JSON.stringify(person, null, 2)}</pre>

                <Text key={`select-msg-receiver_${person.id}`}>
                  {person.firstName} {person.LastName}
                </Text>
              ))
            ) : (
              <Text>no data</Text>
            )}
          </Content>
        </Flex>
      </Fragment>
    );
  }
}
