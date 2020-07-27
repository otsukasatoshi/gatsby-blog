import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Grid from '../components/Grid';
import Page from '../components/Page';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
import Label from '../../config/site-labels';

const BlogCategoryTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { category, currentPage, totalPage, isFirst, isLast, prevPage, nextPage } = pageContext;
  const pageTitle = `${category}${Label.articles}`;
  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageTitle}
        />
      <Grid>
        <Page title={category}>
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

export default BlogCategoryTemplate;

export const query = graphql`
query BlogCategoryQuery($category: String, $skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    limit: $limit,
    skip: $skip,
    filter: { frontmatter: { category: { in: [$category] }, draft: { ne: true } } },
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
