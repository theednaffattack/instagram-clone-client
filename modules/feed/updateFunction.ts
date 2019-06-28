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
    amFollowerTransform = prev.getThoseIFollowAndTheirPostsResolver.followers.map(
      (peopleIFollow: any) => {
        peopleIFollow.posts!.unshift(newFeedItem);
        return peopleIFollow;
      }
    );
  } else {
    amFollowerTransform = null;
  }

  let goodItems = oldItems;
  goodItems.followers = amFollowerTransform;

  return Object.assign({}, prev, {
    getThoseIFollowAndTheirPostsResolver: goodItems
  });
};
