import React from "react";
import { Flex, Heading, Text, Image, Box, Card } from "rebass";

import Layout from "../components/Layout";
import {
  GetThoseIFollowAndTheirPostsResolverComponent,
  GetThoseIFollowAndTheirPostsResolverDocument
} from "../generated/apolloComponents";
import { MyFollowerPosts } from "../graphql/user/subscriptions/MyFollowerPosts";
// import { GetThoseIFollowAndTheirPostsResolver } from "../graphql/user/queries/GetThoseIFollowAndTheirPosts";

import ThoseIFollow from "../modules/feed/ThoseIFollow";

const Feed = () => (
  <Layout title="List Example (with Function Components) | Next.js + TypeScript Example">
    {/* <List items={items} /> */}
    <Heading as="h1">My Feed</Heading>

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
                            width={[0.43, "350px", "350px"]}
                            // border="lime"
                            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
                            style={{ overflow: "hidden" }}
                          >
                            <Image
                              width={[1, "350px", "350px"]}
                              src={`http://192.168.1.8:4000/temp/${
                                images[0].uri
                              }`}
                            />
                            <Box p={[3, 3, 3]}>
                              <Heading>{title}</Heading>
                              {peopleIFollow.firstName}
                              <Text>{text}</Text>
                            </Box>
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
