import React from 'react';
import Img from 'gatsby-image';
import { useImagePath } from '../../hooks';

const Image = ({ filename, alt }) => {
  const Imagepath = useImagePath(filename);
  return (
    <Img
      fluid={Imagepath}
      alt={alt}
      />
  );
};

export default Image;
