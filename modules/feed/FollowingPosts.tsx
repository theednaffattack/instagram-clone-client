import React, { Component } from "react";
import { Flex } from "rebass";
// import { MyFollowerPosts } from "../../graphql/user/subscriptions/MyFollowerPosts";
import { FollowingList } from "./FollowingListPostsOnly";

interface IThoseIFollowProps {
  data: any;
  loading: any;
  error: any;
  // subscriptionFunc: any;
  subscribeToMore: any;
  subscribeToNewPosts: any;
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
      data,
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
        {getMessageLoading ? "loading" : ""}
        <FollowingList
          mounted={this.state.mounted}
          data={data ? this.props.data : ""}
        />
      </Flex>
    );
  }
}
