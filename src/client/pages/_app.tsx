import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";

import { messages } from "../config/i18n";
import ResetCSS from "../styles/reset";

import DataContext from "../state/DataContext";

import { PRODUCTION, GOOGLE_ANALYTICS_ID } from "../config/env";

type LocaleContext = {
  setLocale: Function;
};
export const LocaleContext = React.createContext<LocaleContext>({
  setLocale: () => console.log("Locale context value not set"),
});

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
// @ts-ignore
if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  // @ts-ignore
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    // @ts-ignore
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    // @ts-ignore
    const { locale } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();

    return { pageProps, locale, initialNow };
  }

  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale,
    };
  }

  setLocale = locale => {
    this.setState({ locale });
  };

  render() {
    // @ts-ignore
    const { locale } = this.state;
    // @ts-ignore
    const { Component, pageProps, initialNow } = this.props;

    const localeMessages = messages[locale];

    const metaTitle = localeMessages["META.TITLE"];
    const metaDescription = localeMessages["META.DESCRIPTION"];
    const metaImage = "https://example.com/image.jpg";

    return (
      <Container>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />

          {/* Search engines */}
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="image" content={metaImage} />
          {/* Schema.org for Google */}
          <meta itemProp="name" content={metaTitle} />
          <meta itemProp="description" content={metaDescription} />
          <meta itemProp="image" content={metaImage} />
          {/* Twitter */}
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@VGCVictoryRoad" />
          <meta name="twitter:creator" content="@VGCVictoryRoad" />
          <meta name="twitter:image" content={metaImage} />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content={metaTitle} />
          <meta name="og:description" content={metaDescription} />
          <meta name="og:site_name" content={metaTitle} />
          <meta name="og:image" content={metaImage} />
          <meta name="og:url" content="https://worlds.victoryroadvgc.com" />
          <meta name="og:type" content="website" />

          {PRODUCTION && <GoogleAnalytics id={GOOGLE_ANALYTICS_ID} />}
        </Head>
        <ResetCSS />
        <IntlProvider
          locale={locale}
          messages={localeMessages}
          initialNow={initialNow}
          textComponent={React.Fragment}
        >
          <LocaleContext.Provider value={{ setLocale: this.setLocale }}>
            <DataContext>
              <Component {...pageProps} />
            </DataContext>
          </LocaleContext.Provider>
        </IntlProvider>
      </Container>
    );
  }
}

const GoogleAnalytics = props => {
  const { id } = props;
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${id}');`,
        }}
      ></script>
    </>
  );
};
