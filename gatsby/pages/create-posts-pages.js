const path = require('path');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const blogList = path.resolve('./src/templates/blog-list.jsx');

  const result = await graphql(
    `
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
      }
    }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark;
  const postsPerPage = 12;
  const numPages = Math.ceil(posts.totalCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        totalPage: numPages,
        isFirst: i + 1 === 1,
        isLast: i + 1 === numPages,
        prevPage: i === 1 ? `/` : `/page/${i}`,
        nextPage: `/page/${i + 2}`
      },
    });
  });
};
