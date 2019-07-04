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
        return (
          <Flex minHeight="90vh" width={[1, 1, 1]}>
            <ViewThreadStateContainer
              threadLength={apolloBag.data.getMessageThreads.length}
              threadIdList={apolloBag.data.getMessageThreads.map(
                thread => thread.id
              )}
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
