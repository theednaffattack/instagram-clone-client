import React from "react";
import { Button } from "rebass";

import { IFollowButtonProps } from "./types";
import { GetThoseIFollowAndTheirPostsResolver } from "../../graphql/user/queries/GetThoseIFollowAndTheirPosts";
import { GET_GLOBAL_POSTS } from "../../graphql/user/queries/GetGlobalPosts";

export default class FollowButton extends React.Component<
  IFollowButtonProps,
  object
> {
  constructor(props: IFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick({ followUser }: any) {
    console.log("some mutation click");
    console.log({ followUser });
    try {
      followUser({
        variables: {
          data: {
            userIDToFollow: this.props.postUserId
          }
        },
        update: (cache: any, { data, error }: any) => {
          // if (!data || !data.getGlobalPosts) {
          //   return;
          // }

          let getNewItems = this.props.data.getGlobalPosts.filter(item => {
            return item.user.id === this.props.postUserId;
          });

          // Read the data from our cache for this query.
          const storeUpdateData = cache.readQuery({
            query: GetThoseIFollowAndTheirPostsResolver
          });

          const globalPostData = cache.readQuery({
            query: GET_GLOBAL_POSTS
          });
          console.log("globalPostData".toUpperCase(), globalPostData);

          let myUser = getNewItems[0].user;

          myUser.posts = getNewItems;

          let transform = {
            ...myUser
          };

          storeUpdateData.getThoseIFollowAndTheirPostsResolver.following.push(
            transform
          );

          cache.writeQuery({
            query: GetThoseIFollowAndTheirPostsResolver,
            data: storeUpdateData
          });
        }
      });
    } catch (error) {
      console.log("oh no an error", error);
    }
  }
  render() {
    const { children, data, followUser, ...props } = this.props;
    return (
      <Button
        type="button"
        onClick={() => this.handleMutationClick({ followUser })}
        {...props}
      >
        {children}
      </Button>
    );
  }
}
