import React from "react";
import { Button } from "rebass";

import { IUnFollowButtonProps } from "./types";
import { UnFollowUserComponent } from "../../generated/apolloComponents";
import { GetThoseIFollowAndTheirPostsResolver } from "../../graphql/user/queries/GetThoseIFollowAndTheirPosts";

export default class UnFollowButton extends React.Component<
  IUnFollowButtonProps,
  object
> {
  constructor(props: IUnFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick({ unFollowUser }: any) {
    const oldFollowers = this.props.oldData;

    // remove the logged in user from the other person's
    // followers
    const filteredList = oldFollowers.getThoseIFollowAndTheirPostsResolver.following.filter(
      item => {
        return item.id !== this.props.followingId;
      }
    );

    // create a new list to replace the old list in cache and UI
    const newListItems = Object.assign({}, oldFollowers, {
      getThoseIFollowAndTheirPostsResolver: {
        ...oldFollowers.getThoseIFollowAndTheirPostsResolver,
        following: [...filteredList]
      }
    });

    // This... is unceccesary? No time to test right now
    const finalList = Object.assign({}, newListItems);

    unFollowUser({
      variables: {
        data: {
          userIDToUnFollow: this.props.followingId
        }
      },
      update: (cache: any, { data }: any) => {
        // if (!data || !data.getThoseIFollowAndTheirPostsResolver) {
        //   return;
        // }
        console.log("data".toUpperCase(), data);
        cache.writeQuery({
          query: GetThoseIFollowAndTheirPostsResolver,
          data: { ...finalList }
        });
      }
    });
  }
  render() {
    const { children, me, ...props } = this.props;

    return (
      <UnFollowUserComponent>
        {(unFollowUser, { called, client, data, error, loading }) => {
          if (error) return <span>error: {error}</span>;
          // if (called) {
          //   return <span>{JSON.stringify(called)}...</span>;
          // }
          if (loading) {
            return <span>loading...</span>;
          }
          return (
            <Button
              type="button"
              bg="fuchsia"
              onClick={() => this.handleMutationClick({ unFollowUser })}
              {...props}
            >
              unfollow
            </Button>
          );
        }}
      </UnFollowUserComponent>
    );
  }
}
