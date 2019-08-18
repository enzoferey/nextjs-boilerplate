const { readFileSync } = require("fs");
const path = require("path");
const accepts = require("accepts");
const glob = require("glob");

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require("intl");
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const defaultLocale = "es";

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
  .sync(path.join(__dirname, "../../../lang/*.json"))
  .map(f => path.basename(f, ".json"));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  if (!localeDataCache.has(locale)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${locale}`);
    const localeDataScript = readFileSync(localeDataFile, "utf8");
    localeDataCache.set(locale, localeDataScript);
  }
  return localeDataCache.get(locale);
};

function createLanguageMiddleware() {
  return (req, res, next) => {
    const accept = accepts(req);
    const locale = accept.languages(supportedLanguages);

    const parsedLocale = !!locale ? locale.split("-")[0] : defaultLocale;

    req.locale = parsedLocale;
    req.localesDataScript = supportedLanguages.map(supportedLanguages =>
      getLocaleDataScript(supportedLanguages)
    );

    next();
  };
}

module.exports = createLanguageMiddleware;
