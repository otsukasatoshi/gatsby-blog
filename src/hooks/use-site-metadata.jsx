import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteAuthor
          siteUsername
          avatar
          defaultImg
          shortBio
          portfolio
          social {
            twitter
            instagram
            github
          }
        }
      }
    }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
