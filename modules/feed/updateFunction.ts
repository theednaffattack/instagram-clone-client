export const updateFunctionMyFollows = (
  prev: any,
  { subscriptionData }: any
) => {
  if (!subscriptionData.data) return prev;

  const newFeedItem = subscriptionData.data.followingPosts;
  const oldItems = prev.getThoseIFollowAndTheirPostsResolver;
  // const itemsToFind = prev.getThoseIFollowAndTheirPostsResolver.followers.map(
  //   peopleIFollow => {
  //     return peopleIFollow.posts.map(item => item);
  //   }
  // );

  let amFollowerTransform;

  if (prev.getThoseIFollowAndTheirPostsResolver != null) {
    console.log(
      "prev.getThoseIFollowAndTheirPostsResolver",
      prev.getThoseIFollowAndTheirPostsResolver
    );

    amFollowerTransform = prev.getThoseIFollowAndTheirPostsResolver.following.map(
      (peopleIFollow: any) => {
        if (peopleIFollow.id === newFeedItem.user.id) {
          return peopleIFollow;
        } else {
          peopleIFollow.posts!.unshift(newFeedItem);
          return peopleIFollow;
        }
      }
    );
  } else {
    amFollowerTransform = null;
  }

  let goodItems = oldItems;
  goodItems.following = amFollowerTransform;

  console.log("goodItems", goodItems);

  return Object.assign({}, prev, {
    getThoseIFollowAndTheirPostsResolver: goodItems
  });
};
