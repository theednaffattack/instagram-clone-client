import * as React from "react";
import Head from "next/head";
import { Flex as FlexBase } from "rebass";
import { minHeight, borders } from "styled-system";
import styled from "styled-components";

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const FlexHeader = styled(FlexBase)`
  ${minHeight}
  ${borders}

  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 9999;
`;

const FlexFooter = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

import MyLink from "./MyLink";
import { MeComponent } from "../generated/apolloComponents";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <Flex
    // border="3px crimson solid"
    m={[0]}
    minHeight="100vh"
    flexDirection="column"
    width={[1]}
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <FlexHeader color="white" as="header">
      <nav>
        <MyLink prefetch href="/" name="home">
          <a>Home</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch href="/cars" name="cars">
          <a>Cars</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch href="/login" name="login">
          <a>Login</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch href="/register" name="register">
          <a>Register</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch href="/hello" name="hello">
          <a>Hello</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch href="/forgot-password" name="forgot-password">
          <a>Forgot Password</a>
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
                <MyLink prefetch href="/logout" name="logout">
                  <a>Logout</a>
                </MyLink>
              </>
            );
          }}
        </MeComponent>
      </nav>
    </FlexHeader>

    <Flex flexDirection="column" minHeight="50vh">
      {children}
      <FlexFooter flexDirection="column" as="footer">
        <hr />
        <span>Made with ❤️ by Eddie Naff</span>
      </FlexFooter>
    </Flex>
  </Flex>
);

export default Layout;
