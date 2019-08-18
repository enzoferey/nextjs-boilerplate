import React, { useContext } from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";

import { LocaleContext } from "../pages/_app";
import { Languages } from "../config/i18n";

const PageWrapper = props => {
  const { intl, children } = props;

  const { setLocale } = useContext(LocaleContext);
  const switchLocale = () => {
    const targetLocale =
      intl.locale === Languages.English ? Languages.Spanish : Languages.English;
    setLocale(targetLocale);
  };

  return (
    <Main>
      Locale: {intl.locale}
      <button onClick={switchLocale}>Switch locale</button>
      {children}
    </Main>
  );
};

export default injectIntl(PageWrapper);

const Main = styled.div`
  height: 100%;
`;
