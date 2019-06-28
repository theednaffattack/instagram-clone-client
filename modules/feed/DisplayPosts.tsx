import React from "react";
import {
  Box as BoxBase,
  Card as CardBase,
  Heading,
  Text,
  Button,
  Flex as FlexBase
} from "rebass";
import styled from "styled-components";
import { borders, display, overflow } from "styled-system";
import posed, { PoseGroup } from "react-pose";

import FollowButton from "./FollowButton";

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

const PosedCard = posed(Card)({
  enter: { opacity: 1, delay: ({ index }) => index * staggerDuration },
  exit: { opacity: 0, delay: ({ index }) => index * staggerDuration },
  invisible: { opacity: 0 }
});

interface IDisplayPostsProps {
  data: any;
  subcribeGlblPosts: any;
  dataFollower: any;
  errorFollowUser: any;
  followUser: any;
  loadingFollowUser: any;
  subscribeGlblPosts: any;
}
// () =>
//                 subscribeToMore({
//                   document: MyFollowerPosts,
//                   variables: {
//                     data: {
//                       sentBy: "35f73d05-61de-46b4-8dbf-bf1d2fd2ed38",
//                       message: "what does this message do?"
//                     }

export const DisplayCards = ({
  data,
  errorFollowUser,
  followUser,
  loadingFollowUser,
  errorGlblPosts
}: IDisplayPostsProps) => (
  <PoseGroup
    delta={1}
    preEnterPose="invisible"
    enterPose="enter"
    exitPose="exit"
    animateOnMount={true}
  >
    {data.getGlobalPosts.map((post: any, index: number) => {
      if (errorFollowUser) {
        return <Flex>Error!</Flex>;
      }
      if (loadingFollowUser) {
        return <Flex>loading...</Flex>;
      } else {
        return (
          <PosedCard
            key={`${index} - ${data.__typename}`}
            bg="white"
            my={[3, 3, 3]}
            mx={[3, 3, 3]}
            borderRadius="15px"
            width={[1, "350px", "350px"]}
            // border="lime"
            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            display="flex"
            overflow="hidden"
          >
            <Flex width={[1, 1, 1]} flexDirection="column">
              <Box
                width={[1, 1, 1]}
                style={{
                  minHeight: "250px",
                  maxHeight: "250px",
                  overflow: "hidden", // `url(${Background})`
                  backgroundImage: `url(http://192.168.1.8:4000/temp/${
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
                    <FollowButton
                      data={data}
                      postUserId={post.user.id}
                      followUser={followUser}
                      errorGlblPosts={errorGlblPosts}
                    >
                      follow
                    </FollowButton>
                  </Flex>
                </Flex>
                <Text alignSelf="end">{post.text}</Text>
              </Box>
            </Flex>
          </PosedCard>
        );
      }
    })}
  </PoseGroup>
);

interface IDisplayPostsProps {
  subscribeGlblPosts: any;
}

export class DisplayPosts extends React.Component<IDisplayPostsProps, object> {
  componentDidMount() {
    this.props.subscribeGlblPosts();
  }
  render() {
    return (
      <DisplayCards
        followUser={this.props.followUser}
        errorGlblPosts={this.props.errorGlblPosts}
        data={this.props.data}
      />
    );
  }
}
