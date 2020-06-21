import React from 'react';
import { Link } from 'gatsby';
import Label from '../../../config/site-labels';
import './style.scss';

const Pagination = ({ currentPage, totalPage, isFirst, isLast, prevPage, nextPage }) => {
  return (
    <ul className="pagination">
      <li>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← {Label.prev}
          </Link>
        )}
      </li>
      <li>{currentPage} / {totalPage}</li>
      <li>
        {!isLast && (
          <Link to={nextPage} rel="next">
            {Label.next} →
          </Link>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
