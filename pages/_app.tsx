import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

import withApollo from "../lib/withApollo";

// Global styles but theme- and update-able!
const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}  
body {
    margin: 0;
    text-size-adjust: 100%;
    font-family: 'Montserrat', sans-serif;
  }
*, *:before, *:after {
  box-sizing: inherit;
}
`;

const blue = "#07c";

const theme = {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue,
    lightgray: "#f6f6ff",
    text: "rgb(68, 68, 68)"
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    sans: "montserrat, sans-serif",
    mono: "Menlo, monospace"
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
    special: "0 0 16px 4px rgba(0, 0, 0, .125)"
  },
  radii: {
    card: "17px"
  },
  buttons: {
    primary: {
      color: "#fff",
      backgroundColor: blue
    },
    outline: {
      color: "#fff",
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 2px"
    },
    gradient: {
      backgroundImage:
        "linear-gradient( 87deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%)",

      boxShadow: "0px 10px 27px 0px rgba(0, 0, 0, 0.1);"
    }
  },
  borders: {
    crimson: "2px crimson dashed",
    lime: "2px limegreen dashed",
    purp: "2px rebeccapurple dashed"
  }
};

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
