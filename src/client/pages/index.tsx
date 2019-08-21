import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import BaseLayout from "../layouts/BaseLayout";

const ExamplePage = () => {
  return (
    <BaseLayout>
      <Red>
        <FormattedMessage id="TEST" />
      </Red>
    </BaseLayout>
  );
};

export default ExamplePage;

const Red = styled.span`
  color: red;
`;
