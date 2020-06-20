const _ = require('lodash');
const path = require('path');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const blogTags = path.resolve('./src/templates/blog-tags.jsx');

  const result = await graphql(
    `
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const tags = result.data.allMarkdownRemark.group;
  const postsPerPage = 12;

  tags.forEach((tag, i) => {
    const numPages = Math.ceil(tag.totalCount / postsPerPage);
    const tagSlug = `/tag/${_.kebabCase(tag.fieldValue)}`;
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? tagSlug : `${tagSlug}/page/${i + 1}`,
        component: blogTags,
        context: {
          tag: tag.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          totalPage: numPages,
          isFirst: i + 1 === 1,
          isLast: i + 1 === numPages,
          prevPage: i === 1 ? tagSlug : `${tagSlug}/page/${i}`,
          nextPage: `${tagSlug}/page/${i + 2}`
        },
      });
    });
  });
};
