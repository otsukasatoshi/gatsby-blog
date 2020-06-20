import React from 'react';
import './style.scss';

const Page = ({ title, children }) => {
  return (
    <div className="page">
      <div className="page__inner">
        { title && <h2 className="page__heading">{title}</h2> }
        <div className="page__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
