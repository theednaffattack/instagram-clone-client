import React from "react";
import { Button } from "rebass";

// import { IFollowButtonProps } from "./types";
// import { GET_GLOBAL_POSTS } from "../../graphql/user/queries/GetGlobalPosts";
import { GetThoseIFollowAndTheirPostsResolver } from "../../graphql/user/queries/GetThoseIFollowAndTheirPosts";
import { storeKeyNameFromField } from "apollo-utilities";
import { GET_GLOBAL_POSTS } from "../../graphql/user/queries/GetGlobalPosts";

export interface IFollowButtonProps {
  children: any;
  data: any;
  followUser: any;
  postUserId: string;
}

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
          console.log("data".toUpperCase(), data);
          console.log(
            "this.props.data.getGlobalPosts".toUpperCase(),
            this.props.data.getGlobalPosts
          );

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

          // delete getNewItems[0].user;
          myUser.posts = getNewItems;

          let transform = {
            ...myUser
          };
          console.log("transform".toUpperCase(), transform);
          console.log("storeUpdateData".toUpperCase(), storeUpdateData);
          // Add our comment from the mutation to the end.
          // storeUpdateData.getThoseIFollowAndTheirPostsResolver.following.push(
          //   getNewItems[0]
          // );

          // console.log("testThis".toUpperCase(), testThis);
          // console.log("getNewItems".toUpperCase(), getNewItems);

          // console.log(
          //   "this.prop.data".toUpperCase(),
          //   this.props.data.getGlobalPosts.filter(item => {
          //     return item.id === this.props.postUserId;
          //   })
          // );

          // console.log("getNewItems", getNewItems);

          // let finalList = [...getNewItems, ...this.props.data.getGlobalPosts];

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
