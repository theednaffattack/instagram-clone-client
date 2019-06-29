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
  enter: { opacity: 1, delay: ({ index }) => index * staggerDuration },
  exit: { opacity: 0, delay: ({ index }) => index * staggerDuration },
  invisible: { opacity: 0 }
});

export const FollowingList = ({ data, mounted }: IFollowingListProps) => (
  <PoseGroup
    delta={1}
    preEnterPose="invisible"
    enterPose="enter"
    exitPose="exit"
    animateOnMount={true}
  >
    {data
      ? data.getThoseIFollowAndTheirPostsResolver.following.map(
          (peopleIFollow, peopleIndex) => {
            return peopleIFollow.posts.map(({ title, text, images }, index) => {
              return (
                <PosedCard
                  index={index}
                  pose={mounted ? "enter" : "exit"}
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
                  style={{ opacity: 0 }}
                >
                  <Flex width={[1, 1, 1]} flexDirection="column">
                    <Box
                      width={[1, 1, 1]}
                      style={{
                        minHeight: "250px",
                        maxHeight: "250px",
                        overflow: "hidden", // `url(${Background})`
                        backgroundImage: `url(http://192.168.1.8:4000/temp/${
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
                          {peopleIFollow.firstName}
                          <UnFollowButton
                            oldData={data}
                            followingId={peopleIFollow.id}
                            bg="fuchsia"
                          >
                            unfollow
                          </UnFollowButton>
                        </Flex>
                      </Flex>
                      <Text alignSelf="end">{text}</Text>
                    </Box>
                  </Flex>
                </PosedCard>
              );
            });
          }
        )[0]
      : []}
  </PoseGroup>
);
