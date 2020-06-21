import React from 'react';
import './style.scss';

const Content = ({ body }) => {
  return (
    <div className="post-content">
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default Content;
