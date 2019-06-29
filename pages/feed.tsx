import React from "react";
import { Heading, Text, Flex } from "rebass";

import Layout from "../components/Layout";
import GlobalFeed from "../modules/feed/GlobalFeed";
import MyFeed from "../modules/feed/MyFeed";
import { MeComponent } from "../generated/apolloComponents";

const Feed = () => (
  <Layout title="My Feed">
    <MeComponent>
      {({ data, loading, error }) => {
        if (!data || !data.me) {
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
          <>
            <Flex px={[4, 0, 0]} flexDirection="column">
              <MyFeed me={data.me} />
            </Flex>
            <Flex bg="#eee" px={[4, 0, 0]} flexDirection="column">
              <GlobalFeed me={data.me} />
            </Flex>
          </>
        ); // <FileListMutation me={data.me.id} />;
      }}
    </MeComponent>
  </Layout>
);

export default Feed;
