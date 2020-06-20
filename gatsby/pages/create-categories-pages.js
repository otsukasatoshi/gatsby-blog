const _ = require('lodash');
const path = require('path');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const blogCategory = path.resolve('./src/templates/blog-category.jsx');

  const result = await graphql(
    `
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        group(field: frontmatter___category) {
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

  const categories = result.data.allMarkdownRemark.group;
  const postsPerPage = 12;

  categories.forEach((category, i) => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/category/${_.kebabCase(category.fieldValue)}`;
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i + 1}`,
        component: blogCategory,
        context: {
          category: category.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          totalPage: numPages,
          isFirst: i + 1 === 1,
          isLast: i + 1 === numPages,
          prevPage: i === 1 ? categorySlug : `${categorySlug}/page/${i}`,
          nextPage: `${categorySlug}/page/${i + 2}`
        },
      });
    });
  });
};
