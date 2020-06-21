import React from 'react';
import Header from './Header';
import Content from './Content';
import Category from './Category';
import Tags from './Tags';
import Share from './Share';
import Bio from '../Bio';
import PrevNext from './PrevNext';
import TOC from './TOC';
import './style.scss';

const Post = ({ post, pageContext, postUrl }) => {
  const { html, timeToRead, headings, fields } = post;
  const { date, title, description, thumbnail, category, tags } = post.frontmatter;
  const { previous, next } = pageContext;
  return (
    <article className="post">
      <Header
        title={title}
        description={description}
        date={date}
        timeToRead={timeToRead}
        thumbnail={thumbnail}
        />
      <Content body={html} />
      <Category category={category} />
      <Tags tags={tags} />
      <Share
        title={title}
        url={postUrl}
        />
      <Bio />
      <PrevNext
        previous={previous}
        next={next}
        />
      <TOC
        headings={headings}
        slug={fields.slug}
        />
    </article>
  );
};

export default Post;
