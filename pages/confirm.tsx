import * as React from "react";
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from "../generated/apolloComponents";
import { confirmUserMutation } from "../graphql/user/mutations/confirmUser";
import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";

export default class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token) {
      return {};
    }

    const trythis = await apolloClient.mutate<
      ConfirmUserMutation,
      ConfirmUserVariables
    >({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });

    if (trythis) {
      redirect(ctx, "/login");
    } else {
      return "soemthing went wrong, confirmation mutation";
    }

    return {};
  }

  render() {
    return "something went wrong";
  }
}
