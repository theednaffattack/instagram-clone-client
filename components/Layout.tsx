import * as React from "react";
import Head from "next/head";
import { Flex as FlexBase } from "rebass";
import { maxWidth, minHeight, borders } from "styled-system";
import styled from "styled-components";

import AuthHeader from "./AuthHeader";

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
    <Flex
      flexDirection="row"
      justifyContent="center"
      width={[1, 1, 1]}
      px={[1, 1, 4]}
      as="nav"
    >
      <MaxFlex flexDirection="column" width="860px">
        <AuthHeader title="My Feed" />
      </MaxFlex>
    </Flex>
    <Flex flexDirection="column" minHeight="50vh">
      {children}
      <Flex
        flexDirection="row"
        justifyContent="center"
        width={[1, 1, 1]}
        px={[1, 1, 4]}
        as="footer"
      >
        <MaxFlex flexDirection="column" width="860px">
          <hr />
          <AuthHeader title="My Feed" />
          <span>Made with ❤️ by Eddie Naff</span>
        </MaxFlex>
      </Flex>
    </Flex>
  </Flex>
);

export default Layout;
