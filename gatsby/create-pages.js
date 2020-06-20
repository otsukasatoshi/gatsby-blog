const path = require('path');

const createPostsPages = require('./pages/create-posts-pages.js');
const createCategoriesPages = require('./pages/create-categories-pages.js');
const createTagsPages = require('./pages/create-tags-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/blog-post.jsx');

  const result = await graphql(
    `
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      },
    });
  });

  await createPostsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createTagsPages(graphql, actions);
};

module.exports = createPages;
