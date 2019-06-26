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
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    console.log("VIEW PREV");
                    console.log(prev);
                    console.log("subscriptionData.data".toUpperCase());
                    console.log(subscriptionData.data.newPost);
                    const newFeedItem = subscriptionData.data.newPost;
                    const oldItems = prev.getThoseIFollowAndTheirPostsResolver;
                    const itemsToFind = prev.getThoseIFollowAndTheirPostsResolver.am_follower.map(
                      peopleIFollow => {
                        return peopleIFollow.posts.map(item => item);
                      }
                    );
                    let amFollowerTransform;
                    if (prev.getThoseIFollowAndTheirPostsResolver != null) {
                      amFollowerTransform = prev.getThoseIFollowAndTheirPostsResolver.am_follower.map(
                        peopleIFollow => {
                          peopleIFollow.posts!.unshift(newFeedItem);
                          return peopleIFollow;
                        }
                      );
                    } else {
                      amFollowerTransform = null;
                    }

                    // const itemsToSendBack = prev.getThoseIFollowAndTheirPostsResolver.am_follower.map(
                    //   peopleIFollow => {
                    //     let peoplePostPlusNew = peopleIFollow;
                    //     peoplePostPlusNew.posts(newFeedItem);
                    //     return peoplePostPlusNew;
                    //   }
                    // );
                    // return prev;
                    console.log("newFeedItem");
                    console.log(newFeedItem);
                    console.log("oldItems");
                    console.log(oldItems);
                    console.log("itemsToFind");
                    console.log(itemsToFind);
                    console.log("itemsToSendBack");
                    console.log(amFollowerTransform);

                    let goodItems = oldItems;
                    goodItems.am_follower = amFollowerTransform;

                    console.log("goodItems");
                    console.log(goodItems);

                    return Object.assign({}, prev, {
                      getThoseIFollowAndTheirPostsResolver: goodItems
                    });
                  }
                })
              }
            />

            {data
              ? data.getThoseIFollowAndTheirPostsResolver.am_follower.map(
                  peopleIFollow => {
                    return peopleIFollow.posts.map(
                      ({ title, text, images }, index) => {
                        return (
                          <Card
                            key={index}
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
