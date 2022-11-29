import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
  MuiThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@material-ui/core";
import { darkTheme, lightTheme } from "../src/theme";
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(prefersDarkMode ? darkTheme : lightTheme);
  }, [prefersDarkMode]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <Head>
        <title>Igor Thierry</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} setTheme={setTheme} />
      </MuiThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
