import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import data from "../../data.json";
const { name } = data;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR" style={{ overflowX: "hidden" }}>
        <Head>
          <meta charSet="utf-8" />

          {/* <!-- Primary Meta Tags --> */}
          <title>Igor Thierry - Desenvolvedor Full-Stack</title>
          <meta
            name="title"
            content="Igor Thierry - Desenvolvedor Full-Stack"
          />
          <meta
            name="description"
            content="Olá meu nome é Igor Thierry sou um desenvolvedor full-stack, crio sites modernos e aplicativos multiplataforma usando as melhores tecnologias do mercado."
          />
          <meta name="keywords" content={name + " desenvolvedor full-stack"} />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.igorthierry.com.br/" />
          <meta
            property="og:title"
            content="Igor Thierry - Desenvolvedor Full-Stack"
          />
          <meta
            property="og:description"
            content="Olá meu nome é Igor Thierry sou um desenvolvedor full-stack, crio sites modernos e aplicativos multiplataforma usando as melhores tecnologias do mercado."
          />
          <meta property="og:image" content="/aizen-manga-muken.jpg" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://www.igorthierry.com.br/"
          />
          <meta
            property="twitter:title"
            content="Igor Thierry - Desenvolvedor Full-Stack"
          />
          <meta
            property="twitter:description"
            content="Olá meu nome é Igor Thierry sou um desenvolvedor full-stack, crio sites modernos e aplicativos multiplataforma usando as melhores tecnologias do mercado."
          />
          <meta property="twitter:image" content="/aizen-manga-muken.jpg" />

          {/* PWA primary color */}
          <meta name="theme-color" content="black" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.webmanifest"></link>
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
