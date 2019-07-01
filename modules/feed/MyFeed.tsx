import React from "react";
import { Heading } from "rebass";

import InteriorLayout from "../../components/InteriorLayout";
import { MyFollowingPostsComponent } from "../../generated/apolloComponents";
import { FOLLOWING_POSTS } from "../../graphql/user/subscriptions/FollowingPosts";
import FollowingPosts from "../../modules/feed/FollowingPosts";
import { updateFunctionMyFollows as updateFunctionMyFollows_v2 } from "./updateFuncFollowingPosts";

const Feed = ({ me }) => (
  <InteriorLayout title="My Feed">
    <Heading as="h1">My Feed</Heading>
    <Heading as="h3">{me.name}</Heading>

    <MyFollowingPostsComponent>
      {({ data, error, loading, subscribeToMore }) => (
        <FollowingPosts
          data={data ? data : null}
          loading={loading}
          error={error}
          subscribToMore={subscribeToMore}
          subscribeToNewPosts={() =>
            subscribeToMore({
              document: FOLLOWING_POSTS,
              variables: {
                data: {
                  sentBy: "35f73d05-61de-46b4-8dbf-bf1d2fd2ed38",
                  message: "what does this message do?"
                }
              },
              updateQuery: (prev, { subscriptionData }) =>
                updateFunctionMyFollows_v2(prev, { subscriptionData })
            })
          }
        />
      )}
    </MyFollowingPostsComponent>
  </InteriorLayout>
);

export default Feed;
