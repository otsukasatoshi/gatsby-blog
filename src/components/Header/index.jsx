import React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../../hooks';
import Headroom from 'react-headroom';
import Search from '../Search';
import './style.scss';

const Header = () => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const { siteTitle } = useSiteMetadata();
  return (
    <Headroom>
      <header className="header">
        <div className="header__inner">
          <h1 className="header__logo">
            <Link to={rootPath}>
              {siteTitle}
            </Link>
          </h1>
          <div className="header__search">
            <Search />
          </div>
        </div>
      </header>
    </Headroom>
  );
};

export default Header;
