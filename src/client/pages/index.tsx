import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import BaseLayout from "../layouts/BaseLayout";

const ExamplePage = () => {
  return (
    <BaseLayout>
      <FormattedMessage id="TEST" />
    </BaseLayout>
  );
};

export default ExamplePage;

const Main = styled.div``;
