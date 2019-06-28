import React, { Component } from "react";
import { Flex } from "rebass";
// import { MyFollowerPosts } from "../../graphql/user/subscriptions/MyFollowerPosts";
import { FollowingList } from "./FollowingList";

interface IThoseIFollowProps {
  data: any;
  loading: any;
  error: any;
  // subscriptionFunc: any;
  subscribeToMore: any;
}

export default class ThoseIFollow extends Component<
  IThoseIFollowProps,
  object
> {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    };
  }
  componentDidMount() {
    console.log(this.props);
    this.props.subscribeToNewPosts();
    this.setState((prevProps, prevState) => {
      console.log("ThoseIFollow componentDidMount");
      console.log("prevState", prevProps);
      console.log("prevState", prevState);

      return {
        mounted: true
      };
    });
  }
  render() {
    const {
      data: { getThoseIFollowAndTheirPostsResolver },
      loading: getMessageLoading,
      error: getMessageError,
      // subscriptionFunc,
      subscribeToMore
    } = this.props;
    console.log(typeof subscriptionFunc);
    console.log(subscribeToMore);
    return (
      <Flex
        width={[1, 1, 1]}
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
      >
        <FollowingList mounted={this.state.mounted} data={this.props.data} />
      </Flex>
    );
  }
}
