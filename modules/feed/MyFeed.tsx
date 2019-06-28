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

import InteriorLayout from "../../components/InteriorLayout";
import { GetThoseIFollowAndTheirPostsResolverComponent } from "../../generated/apolloComponents";
import { MyFollowerPosts } from "../../graphql/user/subscriptions/MyFollowerPosts";
import ThoseIFollow from "../../modules/feed/ThoseIFollow";
import UnFollowButton from "./UnFollowButton";
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

const staggerDuration = 100;

const Item = posed(Card)({
  enter: { opacity: 1, delay: ({ index }) => index * staggerDuration },
  exit: { opacity: 0 }
});

const PosedCard = posed(Card)({
  enter: { opacity: 1, delay: ({ index }) => index * staggerDuration },
  exit: { opacity: 0 }
});

const Feed = ({ me }) => (
  <InteriorLayout title="My Feed">
    <Heading as="h1">My Feed</Heading>
    <Heading as="h3">{me.name}</Heading>

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
          </Flex>
        );
      }}
    </GetThoseIFollowAndTheirPostsResolverComponent>
  </InteriorLayout>
);

export default Feed;
