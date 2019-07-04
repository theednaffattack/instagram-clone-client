import React from "react";

import Layout from "../components/Layout";
import { MeComponent } from "../generated/apolloComponents";
import ViewThreads from "../modules/messages/ViewThreads";
// import Layout from "../components/AuthLayoutPlain";
import MessagesPage from "../modules/messages/MessagesPage";
// import { MyContext } from "../interfaces/MyContext";

export default class Messages extends React.Component {
  // static async getInitialProps({
  //   query: { token },
  //   apolloClient,
  //   ...ctx
  // }: MyContext) {
  //   console.log(Object.keys(ctx));
  //   console.log(Object.keys(apolloClient));
  //   console.log(ctx.req);
  //   return {};
  // }
  render() {
    return (
      <Layout>
        <MeComponent>
          {/* {data => <MessagesPage me={data.data.id} data={data} />} */}
          {data => <ViewThreads me={data.data.me.id} />}
        </MeComponent>
      </Layout>
    );
  }
}
