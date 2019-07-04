import React from "react";

export interface IViewThreadStateContainerProps_new {
  data: any;
  loading: any;
  error: any;
  subscribeToMore: any;

  threadId: string;
  thread: any;
}

export interface IViewThreadStateContainerState_new {
  selectedThread: number | null;
}

export class ViewThreadStateContainer_new extends React.Component<
  IViewThreadStateContainerProps_new,
  IViewThreadStateContainerState_new
> {
  render() {
    return (
      <Flex my={2} flexDirection="column" bg="lightblue">
        <Text>{this.props.threadId}</Text>
        <Text>{this.props.thread.messages.length}</Text>
      </Flex>
    );
  }
}
