import React from "react";
import {
  Box as BoxBase,
  Card as CardBase,
  Heading,
  Text,
  Button,
  Flex
} from "rebass";
import styled from "styled-components";
import { borders, display, overflow } from "styled-system";

const Box = styled(BoxBase)`
  ${borders}
`;

const Card = styled(CardBase)`
  ${display}
  ${overflow}
`;

export const DisplayPosts = ({
  data,
  dataFollowUser,
  errorFollowUser,
  followUser,
  loadingFollowUser
}) => {
  const cards = data.getGobalPosts.map((post, index) => {
    if (errorFollowUser) {
      return <Flex>Error!</Flex>;
    }
    if (loadingFollowUser) {
      return <Flex>loading...</Flex>;
    }
    return (
      <Card
        key={`${index} - ${data.__typename}`}
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
                <Button
                  followUser={followUser}
                  onClick={() =>
                    followUser({
                      variables: {
                        data: {
                          userIDToFollow: post.user.id
                        }
                      }
                    })
                  }
                  type="button"
                  p={0}
                >
                  follow
                </Button>
              </Flex>
            </Flex>
            <Text alignSelf="end">{post.text}</Text>
          </Box>
        </Flex>
      </Card>
    );
  });

  return cards;
};
