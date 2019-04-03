import { MyContext } from "../interfaces/MyContext";
import { LogoutMutation } from "../graphql/user/mutations/Logout";
// import { Router } from "../server/routes";
// import Router from "next/router";
import redirect from "../lib/redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({ mutation: LogoutMutation });
  await apolloClient.resetStore();
  redirect(ctx, "/login");
  //   Router.push("/login");
  //   Router.push("/login");

  return {};
};

export default Logout;
