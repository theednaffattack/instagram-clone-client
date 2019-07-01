import * as React from "react";
import Head from "next/head";
import { Box, Flex as FlexBase } from "rebass";
import { minHeight, borders } from "styled-system";
import styled from "styled-components";
import Icon from "react-geomicons";

import { MeComponent } from "../generated/apolloComponents";
import MyLink from "./Link";

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

type Props = {
  title?: string;
};

const AuthenticatedHeader: React.FunctionComponent = () => (
  <Flex flexDirection="row" width={[1, 1, 1]} px={[1, 1, 4]} as="nav">
    {/* <nav> */}
    <MyLink color="text" mx={2} prefetch href="/" name="home">
      Home
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/feed" name="feed">
      Feed
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/post" name="post">
      Post
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/messages" name="messages">
      Messages
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/login" name="login">
      Login
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/register" name="register">
      Register
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/hello" name="hello">
      Hello
    </MyLink>{" "}
    |{" "}
    <MyLink mx={2} prefetch href="/forgot-password" name="forgot-password">
      Forgot Password
    </MyLink>
    <MeComponent>
      {({ data, loading }) => {
        if (!data || loading || !data.me) {
          return null;
        }
        return (
          <>
            {" "}
            |{" "}
            <Box pl={2} width="25px">
              <Icon name="user" fill="rgb(0, 116, 217)" />
            </Box>
            <MyLink mx={2} prefetch href="/profile" name="profile">
              Profile
            </MyLink>{" "}
            |{" "}
            <MyLink mx={2} prefetch href="/logout" name="logout">
              Logout
            </MyLink>
          </>
        );
      }}
    </MeComponent>
    {/* </nav> */}
  </Flex>
);

export default AuthenticatedHeader;
