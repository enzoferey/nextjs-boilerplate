import React from "react";
import PropTypes from "prop-types";

import Meta from "./Meta";

const HeadPartial = ({ additionalMeta, ...metaProps }) => {
  return (
    <>
      <Meta {...metaProps} />

      {additionalMeta}
    </>
  );
};

HeadPartial.propTypes = {
  additionalMeta: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default HeadPartial;
