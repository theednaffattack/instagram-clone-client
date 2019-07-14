import React from "react";

import { GetListToCreateThreadComponent } from "../../generated/apolloComponents";
import { ChooseThreadUser } from "./ChooseThreadUser";

export interface IAddressBookMutationProps {
  dataMessageThreads: any;
  selectedThreadIndex: number;
  handleAddInviteeToThread: any;
}

function AddressBookMutation({
  dataMessageThreads,
  handleAddInviteeToThread,
  selectedThreadIndex
}: IAddressBookMutationProps) {
  return (
    <>
      <GetListToCreateThreadComponent>
        {({
          data: dataCreateThread,
          loading: loadingCreateThread,
          error: errorCreateThread
        }) => {
          if (errorCreateThread)
            return <div>some error: {errorCreateThread}</div>;
          if (loadingCreateThread) {
            return <div>loading...</div>;
          }
          // return <div>hello data{JSON.stringify(data)}</div>;
          if (dataCreateThread) {
            return (
              <div>
                <ChooseThreadUser
                  handleAddInviteeToThread={handleAddInviteeToThread}
                  dataCreateThread={
                    dataCreateThread.getListToCreateThread &&
                    dataCreateThread.getListToCreateThread.thoseICanMessage
                  }
                  loadingCreateThread={loadingCreateThread}
                  errorCreateThread={errorCreateThread}
                  messages={
                    dataMessageThreads &&
                    dataMessageThreads.getMessageThreads &&
                    dataMessageThreads.getMessageThreads[selectedThreadIndex]
                      ? dataMessageThreads.getMessageThreads[
                          selectedThreadIndex
                        ].messages
                      : []
                  }
                />
              </div>
            );
          } else {
            return <div>some weirdness</div>;
          }
        }}
      </GetListToCreateThreadComponent>
    </>
  );
}

export default AddressBookMutation;
