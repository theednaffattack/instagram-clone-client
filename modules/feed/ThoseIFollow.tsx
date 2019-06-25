import React, { Component } from "react";
import { Flex, Text } from "rebass";
import { MyFollowerPosts } from "../../graphql/user/subscriptions/MyFollowerPosts";

// import { GlobalSVGGradient } from "./GlobalSVGGradient";

// import { newMessageSub } from "../../graphql/message/subscriptions/NewMessage";

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
  componentDidMount() {
    // this.props.subscriptionFunc(this.props.subscribeToMore);
    console.log(this.props);
    this.props.subscribeToNewPosts();
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
      <Flex>
        {/* {error ? error.message : ""} */}
        <div>
          {/* {Object.keys(data)} */}
          {/* {getThoseIFollowAndTheirPostsResolver.map(
            (message: any, index: number) => (
              <div key={index}>
                <Text>{message}</Text>
              </div>
            )
          )} */}
          <div
            style={{
              color: "white",
              marginTop: "80px",
              float: "left",
              clear: "both"
            }}
            // ref={el => {
            //   this.messagesEnd = el;
            // }}
          >
            .
          </div>
        </div>
      </Flex>
    );
  }
}
