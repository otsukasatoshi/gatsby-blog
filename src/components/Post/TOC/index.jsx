import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { useActiveHash } from '../../../hooks';
import Slugger from 'github-slugger';
import Label from '../../../../config/site-labels';
import './style.scss';

const slugger = new Slugger();

const TableOfContents = ({ headings, slug }) => {
  slugger.reset();
  let item = headings.map(item => slugger.slug(item.value));
  const activeHash = useActiveHash(item);

  useEffect(() => {
    const ToClinks = document.querySelectorAll(`.toc__items a`);
    ToClinks.forEach(a => {
      a.classList.remove("active")
    });
    const activeLink = document.querySelectorAll(
      `.toc__items a[href$="${"#" + activeHash}"]`
    );
    if (activeLink.length) {
      activeLink[0].classList.add("active")
    }
  }, [activeHash]);

  slugger.reset();

  return (
    <div className="toc">
      <div className="toc__inner">
        <h2>{Label.toc}</h2>
        <ul className="toc__items">
          {headings.map(heading =>
            <li key={heading.value} style={{marginLeft: `${(heading.depth - 2) * 16}px`}}>
              <Link to={`${slug}#` + slugger.slug(heading.value)}>{heading.value}</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
