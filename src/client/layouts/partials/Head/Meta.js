import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const Meta = ({ metaTitle, description }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=0"
    />

    <title>{metaTitle}</title>
    {description && <meta name="description" content={description} />}
  </Head>
);

Meta.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Meta;
