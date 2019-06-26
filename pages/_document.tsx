import * as React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

// // Global styles but theme- and update-able!
// const GlobalStyle = createGlobalStyle`
// html {
//   box-sizing: border-box;
// }
// body {
//     margin: 0;
//     text-size-adjust: 100%;
//     font-family: 'Montserrat', sans-serif;
//   }
// *, *:before, *:after {
//   box-sizing: inherit;
// }
// `;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage: any = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700"
            rel="stylesheet"
            key="google-font-montserrat"
          />
          {styleTags}
        </Head>
        <body>
          {/* <GlobalStyle /> */}
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    );
  }
}
