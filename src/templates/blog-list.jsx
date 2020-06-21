import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Grid from '../components/Grid';
import Page from '../components/Page';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
import Label from '../../config/site-labels';

const BlogListTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage, totalPage, isFirst, isLast, prevPage, nextPage } = pageContext;
  return (
    <Layout>
      <SEO title={Label.home} />
      <Grid>
        <Page>
          <Posts posts={posts} />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            isFirst={isFirst}
            isLast={isLast}
            prevPage={prevPage}
            nextPage={nextPage}
            />
        </Page>
      </Grid>
    </Layout>
  );
};

export default BlogListTemplate;

export const query = graphql`
query BlogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    limit: $limit,
    skip: $skip,
    filter: { frontmatter: { draft: { ne: true } } },
    sort: { fields: [frontmatter___date], order: DESC }
  ){
    edges {
      node {
        id
        fields {
          slug
          categorySlug
        }
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          category
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 800, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
}
`;
