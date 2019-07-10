import React from "react";

import { Flex } from "./StyledRebass";
import { GetMessageThreadsComponent } from "../../generated/apolloComponents";
import { ViewThreadStateContainer } from "./ViewThreadStateContainer";

export interface IViewThreadsProps {
  me: any;
}

function ViewThreads(props: IViewThreadsProps) {
  const { me } = props;
  return (
    <GetMessageThreadsComponent>
      {({ subscribeToMore, ...apolloBag }) => {
        const {
          data: dataThread,
          error: errorThread,
          loading: loadingThread
        } = apolloBag;
        return (
          <Flex minHeight="90vh" width={[1, 1, 1]}>
            <ViewThreadStateContainer
              data={dataThread}
              loading={loadingThread}
              error={errorThread}
              // threadLength={dataThread.getMessageThreads.length}
              subscribeToMore={subscribeToMore}
              me={me}
              {...apolloBag}
            />
          </Flex>
        );
      }}
    </GetMessageThreadsComponent>
  );
}

export default ViewThreads;
