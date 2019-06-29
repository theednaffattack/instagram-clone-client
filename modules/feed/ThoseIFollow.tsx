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

interface IThoseIFollowState {
  mounted: boolean;
}

export default class ThoseIFollow extends Component<
  IThoseIFollowProps,
  IThoseIFollowState
> {
  constructor(props: IThoseIFollowProps) {
    super(props);
    this.state = {
      mounted: false
    };
  }
  componentDidMount() {
    this.props.subscribeToNewPosts();
    this.setState({
      mounted: true
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
