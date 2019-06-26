import React from "react";
import { Flex as FlexBase, Heading } from "rebass";
import styled from "styled-components";
import { borders } from "styled-system";

import { FollowUserComponent } from "../../generated/apolloComponents";
import Layout from "../../components/Layout";
import { GetGobalPostsComponent } from "../../generated/apolloComponents";
import { DisplayPosts } from "./DisplayPosts";

const Flex = styled(FlexBase)`
  ${borders}
`;

const Feed = ({ me }) => (
  <Layout title="My Feed">
    <GetGobalPostsComponent>
      {({
        data: dataGlblPosts,
        error: errorGlblPosts,
        loading: loadingGlblPosts
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
                      me={me}
                    />
                  );
                }}
              </FollowUserComponent>
            </Flex>
          </Flex>
        );
      }}
    </GetGobalPostsComponent>
  </Layout>
);

export default Feed;
