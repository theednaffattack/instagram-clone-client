import React from "react";

import DarkHeaderLayout from "../components/DarkHeaderLayout";
import {
  MeComponent,
  HelloWorldComponent
} from "../generated/apolloComponents";
import ViewThreads from "../modules/messages/ViewThreads";

export default function() {
  return (
    <DarkHeaderLayout>
      <HelloWorldComponent>
        {helloData => (
          <MeComponent>
            {data => {
              if (!data.data.me) {
                return <div>loading....</div>;
              } else {
                return <ViewThreads me={data.data.me.id} data={data} />;
              }
            }}
          </MeComponent>
        )}
      </HelloWorldComponent>
    </DarkHeaderLayout>
  );
}
