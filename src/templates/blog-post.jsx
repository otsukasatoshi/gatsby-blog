import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Iframely from '../components/Iframely';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const title = post.frontmatter.title;
  const description = post.frontmatter.description || post.excerpt;
  const thumbnail = post.frontmatter.thumbnail.childImageSharp.fluid.src;
  const { siteUrl } = useSiteMetadata();
  const postUrl = `${siteUrl}${post.fields.slug}`;
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        thumbnail={thumbnail}
        postUrl={postUrl}
        />
      <Iframely />
      <Post
        post={post}
        pageContext={pageContext}
        postUrl={postUrl}
        />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } } ) {
    excerpt(pruneLength: 160)
    html
    timeToRead
    headings {
      depth
      value
    }
    fields {
      slug
    }
    frontmatter {
      date(formatString: "YYYY/MM/DD")
      title
      description
      category
      tags
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
`;
