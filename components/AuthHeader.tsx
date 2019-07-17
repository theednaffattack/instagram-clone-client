import * as React from "react";
// import Head from "next/head";
import { Box, Flex as FlexBase } from "rebass";
import { maxWidth, minHeight, borders } from "styled-system";
import styled from "styled-components";
import Icon from "react-geomicons";

import { MeComponent } from "../generated/apolloComponents";
// import MessagesNavLink from "./Link";
import MessagesNavLink from "./MessagesNavLink";

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const MaxFlex = styled(FlexBase)`
  ${minHeight}
  ${borders}
  ${maxWidth}
`;

type Props = {
  title?: string;
};

const AuthenticatedHeader: React.FunctionComponent = (props: any) => (
  <Flex
    flexDirection="row"
    justifyContent="center"
    width={[1, 1, 1]}
    px={[1, 1, 4]}
    {...props}
  >
    <MessagesNavLink color="text" mx={2} prefetch href="/" name="home">
      Home
    </MessagesNavLink>{" "}
    |{" "}
    <MessagesNavLink mx={2} prefetch href="/feed" name="feed">
      Feed
    </MessagesNavLink>{" "}
    |{" "}
    <MessagesNavLink mx={2} prefetch href="/post" name="post">
      Post
    </MessagesNavLink>{" "}
    |{" "}
    <MessagesNavLink mx={2} prefetch href="/messages" name="messages">
      Messages
    </MessagesNavLink>{" "}
    |{" "}
    <MessagesNavLink mx={2} prefetch href="/login" name="login">
      Login
    </MessagesNavLink>{" "}
    |{" "}
    <MessagesNavLink mx={2} prefetch href="/register" name="register">
      Register
    </MessagesNavLink>{" "}
    {/* |{" "}
    <MessagesNavLink mx={2} prefetch href="/hello" name="hello">
      Hello
    </MessagesNavLink>{" "} */}
    {/* |{" "}
    <MessagesNavLink mx={2} prefetch href="/forgot-password" name="forgot-password">
      Forgot Password
    </MessagesNavLink> */}
    <MeComponent>
      {({ data, loading }) => {
        if (!data || loading || !data.me) {
          return null;
        }
        return (
          <>
            {" "}
            |{" "}
            <MessagesNavLink mx={2} prefetch href="/logout" name="logout">
              Logout
            </MessagesNavLink>{" "}
            |{" "}
            <Box pl={2} width="25px">
              <Icon name="user" fill="rgb(0, 116, 217)" />
            </Box>
            <MessagesNavLink mx={2} prefetch href="/profile" name="profile">
              Profile
            </MessagesNavLink>
          </>
        );
      }}
    </MeComponent>
  </Flex>
);

export default AuthenticatedHeader;
