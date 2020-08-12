import React from 'react';
import { Link } from 'gatsby';
import Label from '../../../../config/site-labels';
import './style.scss';

const PrevNext = ({ previous, next }) => {
  return (
    <ul className="prev-next">
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            <span className="prev-next__label">← {Label.prev}</span>
            <span>{previous.frontmatter.title}</span>
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            <span className="prev-next__label">{Label.next} →</span>
            <span>{next.frontmatter.title}</span>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default PrevNext;
