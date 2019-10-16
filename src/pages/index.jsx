import { graphql } from 'gatsby';
import * as React from 'react';
import Layout from '../components/global/layout/layout';

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        titleSuffix
        titleDivider
      }
    }
  }
`

export default props => {
  return (
    <Layout title={props.data.site.siteMetadata.title}
            description={props.data.site.siteMetadata.description}
            titleSuffix={props.data.site.siteMetadata.titleSuffix}
            titleDivider={props.data.site.siteMetadata.titleDivider}>
    </Layout>
  );
}
