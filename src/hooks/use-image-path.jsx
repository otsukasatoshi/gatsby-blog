import { graphql, useStaticQuery } from 'gatsby';

const useImagePath = (filename) => {
  const data = useStaticQuery(
    graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    `
  );

  const image = data.images.edges.find((edge) => edge.node.relativePath.includes(filename));
  return image.node.childImageSharp.fluid;
};

export default useImagePath;
