import React from 'react';
import { useSiteMetadata } from '../../hooks';
import './style.scss';

const Footer = () => {
  const { siteTitle } = useSiteMetadata();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__copyright">
          <small>&copy; {currentYear} {siteTitle}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
