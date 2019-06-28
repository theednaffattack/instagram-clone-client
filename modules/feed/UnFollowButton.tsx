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
    console.log("unFollow mutation click".toUpperCase());
    const oldFollowers = this.props.oldData;

    console.log("oldFollowers", oldFollowers);
    // .getThoseIFollowAndTheirPostsResolver
    // Filter the deleted ListItem out of the cached data
    // server returns deleted ListItem

    // const newListItems = data.listItems
    // .filter(i => i.id !== payload.data.deleteListItem.id)

    const filteredList = oldFollowers.getThoseIFollowAndTheirPostsResolver.following.filter(
      item => {
        console.log("item.id", item);
        console.log("unFollowUser", unFollowUser);
        return item.id !== this.props.followingId;
      }
    );

    const newListItems = Object.assign({}, oldFollowers, {
      getThoseIFollowAndTheirPostsResolver: {
        ...oldFollowers.getThoseIFollowAndTheirPostsResolver,
        following: [...filteredList]
      }
    });

    const finalList = Object.assign({}, newListItems);

    console.log("filteredList", filteredList);
    console.log("newListItems", newListItems);
    console.log({
      data: {
        ...newListItems
      }
    });

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
          if (called) {
            return <span>{JSON.stringify(called)}...</span>;
          }
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
              {children}
            </Button>
          );
        }}
      </UnFollowUserComponent>
    );
  }
}
