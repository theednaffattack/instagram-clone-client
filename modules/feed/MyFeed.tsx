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

import Layout from "../../components/Layout";
import { GetThoseIFollowAndTheirPostsResolverComponent } from "../../generated/apolloComponents";
import { MyFollowerPosts } from "../../graphql/user/subscriptions/MyFollowerPosts";
import ThoseIFollow from "../../modules/feed/ThoseIFollow";
import FollowButton from "./FollowButton";
import { updateFunctionMyFollows } from "./updateFunction";

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

const Feed = ({ me }) => (
  <Layout title="My Feed">
    <Heading as="h1">My Feed</Heading>
    <Heading as="h3">{me.name}</Heading>
    <Heading as="h3">{me.id}</Heading>

    <GetThoseIFollowAndTheirPostsResolverComponent>
      {({
        data,
        loading,
        error,
        subscribeToMore // = { subscribeToMoreFunc }
      }) => {
        if (!data) {
          return null;
        }
        if (error) {
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>error!!!</Heading>
            <Text>{error.message}</Text>
          </Flex>;
        }
        if (loading) {
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>loading...</Heading>
          </Flex>;
        }

        return (
          <Flex flexWrap="wrap" justifyContent="center">
            <ThoseIFollow
              data={data ? data : null}
              loading={loading}
              error={error}
              //   subscribToMore={subscribeToMore}
              subscribeToNewPosts={() =>
                subscribeToMore({
                  document: MyFollowerPosts,
                  variables: {
                    data: {
                      sentBy: "35f73d05-61de-46b4-8dbf-bf1d2fd2ed38",
                      message: "what does this message do?"
                    }
                  },
                  updateQuery: (prev, { subscriptionData }) =>
                    updateFunctionMyFollows(prev, { subscriptionData })
                })
              }
            />

            {data
              ? data.getThoseIFollowAndTheirPostsResolver.followers.map(
                  peopleIFollow => {
                    return peopleIFollow.posts.map(
                      ({ title, text, images }, index) => {
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
                                  {peopleIFollow.firstName}
                                  <FollowButton bg="fuchsia">
                                    unfollow
                                  </FollowButton>
                                </Flex>
                                <Text alignSelf="end">{text}</Text>
                              </Box>
                            </Flex>
                          </Card>
                        );
                      }
                    );
                  }
                )
              : ""}
          </Flex>
        );
      }}
    </GetThoseIFollowAndTheirPostsResolverComponent>
  </Layout>
);

export default Feed;
