import * as React from "react";
import { Flex } from "rebass";
import Head from "next/head";

import MyLink from "./MyLink";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <Flex flexDirection="column" width={[1]}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Flex as="header">
      <nav>
        <MyLink prefetch pathn href="/" name="home">
          <a>Home</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch pathn href="/cars" name="cars">
          <a>Cars</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch pathn href="/login" name="login">
          <a>Login</a>
        </MyLink>{" "}
        |{" "}
        <MyLink prefetch pathn href="/register" name="register">
          <a>Register</a>
        </MyLink>{" "}
      </nav>
    </Flex>
    {children}
    <footer>
      <hr />
      <span>Made with ❤️ by Eddie Naff</span>
    </footer>
  </Flex>
);

export default Layout;
