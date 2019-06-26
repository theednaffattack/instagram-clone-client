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
  }
  render() {
    const { data, followUser } = this.props;
    return (
      <Button
        type="button"
        onClick={() => this.handleMutationClick({ followUser })}
      >
        {data ? JSON.stringify(data, null, 2) : "something"}
      </Button>
    );
  }
}
