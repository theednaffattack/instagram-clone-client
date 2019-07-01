import React from "react";
import {
  Box as BoxBase,
  Card as CardBase,
  Flex as FlexBase,
  Heading,
  Text
} from "rebass";
import styled from "styled-components";
import { borders, display, overflow } from "styled-system";
import UnFollowButton from "./UnFollowButton";

const Card = styled(CardBase)`
  ${display}
  ${overflow}
`;

const Box = styled(BoxBase)`
  ${borders}
`;

const Flex = styled(FlexBase)`
  ${borders}
`;

export class MyFeedCard extends React.Component {
  render() {
    const { title, text, images, index, item, items, id } = this.props;
    return (
      <Card
        key={`${index} - ${title}`}
        bg="white"
        my={[3, 3, 3]}
        mx={[3, 3, 3]}
        borderRadius="15px"
        width={[1, "350px", "350px"]}
        // border="lime"
        boxShadow="0 0 16px rgba(0, 0, 0, .25)"
        display="flex"
        overflow="hidden"
        // style={{ overflow: "hidden" }}
      >
        <Flex width={[1, 1, 1]} flexDirection="column">
          <Box
            width={[1, 1, 1]}
            style={{
              minHeight: "250px",
              maxHeight: "250px",
              overflow: "hidden", // `url(${Background})`
              backgroundImage: `url(http://192.168.1.10:4000/temp/${
                images[0].uri
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          />
          <Box p={[3, 3, 3]} pt={[1, 1, 2]}>
            <Flex alignItems="center">
              <Heading mr="auto">{title}</Heading>

              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                person name
                <UnFollowButton oldData={items} followingId={id} bg="fuchsia">
                  unfollow
                </UnFollowButton>
              </Flex>
            </Flex>
            <Text alignSelf="end">{text}</Text>
          </Box>
        </Flex>
      </Card>
    );
  }
}
