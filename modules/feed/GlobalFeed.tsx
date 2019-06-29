import React from "react";
import { Flex as FlexBase, Heading } from "rebass";
import styled from "styled-components";
import { borders } from "styled-system";

import { FollowUserComponent } from "../../generated/apolloComponents";
import InteriorLayout from "../../components/InteriorLayout";
import { GetGlobalPostsComponent } from "../../generated/apolloComponents";
import { DisplayPosts } from "./DisplayPosts";
import { GLOBAL_POSTS } from "../../graphql/user/subscriptions/GlobalPosts";

const Flex = styled(FlexBase)`
  ${borders}
`;

export const subscribeFunction = subscribeGlblPosts => {
  try {
    return subscribeGlblPosts({
      document: GLOBAL_POSTS,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.globalPosts;
        return Object.assign({}, prev, {
          getGlobalPosts: [newItem, ...prev.getGlobalPosts]
        });
      }
    });
  } catch (error) {
    return console.error(error);
  }
};

const Feed = ({ me }) => (
  <InteriorLayout title="My Feed">
    <GetGlobalPostsComponent>
      {({
        data: dataGlblPosts,
        error: errorGlblPosts,
        loading: loadingGlblPosts,
        subscribeToMore: subscribeGlblPosts
      }) => {
        if (errorGlblPosts) return <div>{JSON.stringify(errorGlblPosts)}</div>;
        if (loadingGlblPosts) {
          return <div>LOADING...</div>;
        }
        return (
          <Flex pt={3} width={1} flexDirection="column">
            <Heading>Global Feed</Heading>
            <Heading as="h3">{me.name}</Heading>
            <Flex
              justifyContent="center"
              width={1}
              flexDirection="row"
              flexWrap="wrap"
            >
              <FollowUserComponent>
                {(
                  followUser,
                  {
                    data: dataFollowUser,
                    error: errorFollowUser,
                    loading: loadingFollowUser
                  }
                ) => {
                  return (
                    <DisplayPosts
                      me={me}
                      dataFollowUser={dataFollowUser}
                      errorFollowUser={errorFollowUser}
                      loadingFollowUser={loadingFollowUser}
                      followUser={followUser}
                      data={dataGlblPosts}
                      errorGlblPosts={errorGlblPosts}
                      subscribeGlblPosts={() =>
                        subscribeGlblPosts({
                          document: GLOBAL_POSTS,
                          updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data) return prev;
                            const newItem = subscriptionData.data.globalPosts;
                            return Object.assign({}, prev, {
                              getGlobalPosts: [newItem, ...prev.getGlobalPosts]
                            });
                          }
                        })
                      }
                      me={me}
                    />
                  );
                }}
              </FollowUserComponent>
            </Flex>
          </Flex>
        );
      }}
    </GetGlobalPostsComponent>
  </InteriorLayout>
);

export default Feed;
