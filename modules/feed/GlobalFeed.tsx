import React from "react";
import { Flex as FlexBase, Heading } from "rebass";
import styled from "styled-components";
import { borders } from "styled-system";

import { FollowUserComponent } from "../../generated/apolloComponents";
import Layout from "../../components/Layout";
import { GetGlobalPostsComponent } from "../../generated/apolloComponents";
import { DisplayPosts } from "./DisplayPosts";
import { GLOBAL_POSTS } from "../../graphql/user/subscriptions/GlobalPosts";

const Flex = styled(FlexBase)`
  ${borders}
`;

const Feed = ({ me }) => (
  <Layout title="My Feed">
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
            <Heading as="h3">{me.name}</Heading>
            <Heading as="h3">{me.id}</Heading>
            <Heading>Global Feed</Heading>
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
                      dataFollowUser={dataFollowUser}
                      errorFollowUser={errorFollowUser}
                      loadingFollowUser={loadingFollowUser}
                      followUser={followUser}
                      data={dataGlblPosts}
                      subscribeGlblPosts={subscribeGlblPosts({
                        document: GLOBAL_POSTS,

                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;

                          const oldItems = [...prev.getGlobalPosts!];
                          const newItem = subscriptionData.data.globalPosts;
                          const oldAndNew = [newItem, ...oldItems];
                          console.log("OLD AND NEW", prev.getGlobalPosts);
                          return Object.assign({}, prev, {
                            getGlobalPosts: [newItem, ...prev.getGlobalPosts]
                          });
                        }
                      })}
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
  </Layout>
);

export default Feed;
