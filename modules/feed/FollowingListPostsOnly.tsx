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
import posed, { PoseGroup } from "react-pose";

import UnFollowButton from "./UnFollowButton";

const Box = styled(BoxBase)`
  ${borders}
`;

const Flex = styled(FlexBase)`
  ${borders}
`;

const Card = styled(CardBase)`
  ${display}
  ${overflow}
`;

const staggerDuration = 100;

interface IFollowingListProps {
  mounted: boolean;
  data: any;
}

const PosedCard = posed(Card)({
  enter: { opacity: 1, delay: ({ index = 1 }) => index * staggerDuration },
  exit: { opacity: 0, delay: ({ index = 1 }) => index * staggerDuration },
  invisible: { opacity: 0 }
});

export const FollowingList = ({ data, mounted }: IFollowingListProps) => (
  <Flex width={1} justifyContent="center" flexDirection="row" flexWrap="wrap">
    <PoseGroup
      delta={1}
      preEnterPose="invisible"
      enterPose="enter"
      exitPose="exit"
      animateOnMount={true}
    >
      {data.myFollowingPosts &&
        data.myFollowingPosts.map((post, pIndex) => (
          <PosedCard
            index={pIndex}
            pose="enter"
            bg="white"
            key={`${pIndex} - ${post.title}`}
            my={[3, 3, 3]}
            mx={[3, 3, 3]}
            borderRadius="15px"
            width={[1, "350px", "350px"]}
            // border="lime"
            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            display="flex"
            overflow="hidden"
            style={{ opacity: 0 }}
          >
            <Flex width={[1, 1, 1]} flexDirection="column">
              <Box
                width={[1, 1, 1]}
                style={{
                  minHeight: "250px",
                  maxHeight: "250px",
                  overflow: "hidden",
                  backgroundImage: `url(http://192.168.1.10:4000/temp/${
                    post.images[0].uri
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
              />
              <Box p={[3, 3, 3]} pt={[1, 1, 2]}>
                <Flex alignItems="center">
                  <Heading mr="auto">{post.title}</Heading>

                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    {post.user.firstName}
                    <UnFollowButton
                      oldData={data}
                      followingId={post.user.id}
                      bg="fuchsia"
                    >
                      unfollow
                    </UnFollowButton>
                  </Flex>
                </Flex>
                <Text alignSelf="end">{post.text}</Text>
              </Box>
            </Flex>
          </PosedCard>
        ))}
    </PoseGroup>
  </Flex>
);
