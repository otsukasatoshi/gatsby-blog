import React from 'react';
import Img from 'gatsby-image';
import Meta from '../Meta';
import './style.scss';

const Header = ({ title, description, date, timeToRead, thumbnail }) => {
  return (
    <div className="post-header">
      <div className="post-header__meta">
        <h1>{title}</h1>
        <p>{description}</p>
        <Meta
          date={date}
          timeToRead={timeToRead}
          />
      </div>
      <div className="post-header__img">
        <Img
          fluid={thumbnail.childImageSharp.fluid}
          alt={title}
          />
      </div>
    </div>
  );
};

export default Header;
