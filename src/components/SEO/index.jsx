import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata, useImagePath } from '../../hooks';

const SEO = ({ lang, meta, title, description, thumbnail, postUrl }) => {
  const { siteTitle, siteDescription, siteUsername, siteUrl, defaultImg } = useSiteMetadata();
  const shareImg = useImagePath(defaultImg);
  const seo = {
    title: title || siteTitle,
    description: description || siteDescription,
    url: `${postUrl || siteUrl}`,
    image: `${siteUrl}${thumbnail || shareImg.src}`,
    twitter: `@${siteUsername}`
  };
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s - ${siteTitle}`}
      meta={[
        {
          name: 'description',
          content: seo.description,
        },
        {
          name: 'image',
          content: seo.image,
        },
        {
          property: 'og:title',
          content: seo.title,
        },
        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:url',
          content: seo.url,
        },
        {
          name: 'og:image',
          content: seo.image,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: seo.title,
        },
        {
          name: 'twitter:description',
          content: seo.description,
        },
        {
          name: 'twitter:image',
          content: seo.image,
        },
        {
          name: 'twitter:creator',
          content: seo.twitter,
        }
      ].concat(meta)}
      />
  );
};

SEO.defaultProps = {
  lang: 'ja',
  meta: [],
  title: '',
  description: '',
  thumbnail: '',
  postUrl: ''
};

export default SEO;
