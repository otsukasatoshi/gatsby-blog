const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    const [month, day, year] = new Date(node.frontmatter.date)
    .toLocaleDateString('en-EN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/');
    const slug = `/posts/${year}/${month}/${day}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    if (node.frontmatter.category) {
      const categorySlug = `/category/${_.kebabCase(node.frontmatter.category)}`;
      createNodeField({
        node,
        name: 'categorySlug',
        value: categorySlug
      });
    }

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tag/${_.kebabCase(tag)}`);
      createNodeField({
        node,
        name: 'tagSlugs',
        value: tagSlugs
      });
    }
  }
};

module.exports = onCreateNode;
