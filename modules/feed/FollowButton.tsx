import React from "react";
import { Button } from "rebass";

import { IFollowButtonProps } from "./types";

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
    followUser({
      variables: {
        data: {
          userIDToFollow: this.props.userId
        }
      }
    });
  }
  render() {
    const { children, followUser, ...props } = this.props;
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
