import React from "react";
import PropTypes from "prop-types";

import Head from "./partials/Head";

const BaseLayout = ({ children, ...headProps }) => {
  return (
    <div>
      <Head {...headProps} />

      {children}
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default BaseLayout;
