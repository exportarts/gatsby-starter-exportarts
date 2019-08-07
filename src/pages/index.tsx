import { graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
// @ts-ignore
import Styles from './index.module.scss';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default (props: IndexPageProps) => (
  <React.Fragment>
    <Helmet title="Page 1"/>
    <h1 className={Styles.hello}>Hi people</h1>
  </React.Fragment>
);
