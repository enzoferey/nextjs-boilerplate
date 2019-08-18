import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    const initialProps = await Document.getInitialProps(context);

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const {
        req: { locale, localesDataScript },
      } = context;
      return {
        ...initialProps,
        locale,
        localesDataScript,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    // @ts-ignore
    const { locale, localesDataScript } = this.props;

    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

    return (
      <html lang={locale}>
        <Head />
        <body>
          <Main />
          <script src={polyfill} />
          {localesDataScript.map((localeDataScript, index) => (
            <script
              key={index}
              dangerouslySetInnerHTML={{
                __html: localeDataScript,
              }}
            />
          ))}
          <NextScript />
        </body>
      </html>
    );
  }
}
