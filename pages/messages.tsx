import React from "react";

import Layout from "../components/Layout";
import {
  MeComponent,
  HelloWorldComponent
} from "../generated/apolloComponents";
import ViewThreads from "../modules/messages/ViewThreads";

export default function() {
  return (
    <Layout>
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
    </Layout>
  );
}
