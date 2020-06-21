import React from 'react';
import Img from '../../Image';
import { useSiteMetadata } from '../../../hooks';
import './style.scss';

const Meta = ({ date, timeToRead }) => {
  const { avatar, siteAuthor } = useSiteMetadata();
  return (
    <div className="post-meta">
      <div className="post-meta__avatar">
        <Img
          filename={avatar}
          alt={siteAuthor}
          />
      </div>
      <div className="post-meta__info">
        <span><strong>{siteAuthor}</strong></span>
        <time className="post-meta__time">{date} - Read on {timeToRead} min.</time>
      </div>
    </div>
  );
};

export default Meta;
