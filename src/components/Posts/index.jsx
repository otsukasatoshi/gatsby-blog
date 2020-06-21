import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './style.scss';

const Posts = ({ posts }) => {
  const getItemList = () => {
    const itemList = [];
    posts.forEach(item => {
      itemList.push({
        id: item.node.id,
        slug: item.node.fields.slug,
        categorySlug: item.node.fields.categorySlug,
        date: item.node.frontmatter.date,
        category: item.node.frontmatter.category,
        title: item.node.frontmatter.title || item.node.fields.slug,
        thumbnail: item.node.frontmatter.thumbnail.childImageSharp.fluid
      });
    });
    return itemList;
  };

  const itemList = getItemList();

  return (
    <div className="posts">
      <div className="posts__inner">
        {itemList.map(item => (
          <article key={item.id} className="posts-item">
            <span className="posts-item__category">
              <Link to={item.categorySlug}>
                {item.category}
              </Link>
            </span>
            <Link to={item.slug}>
              <figure className="posts-item__thumbnail">
                <Img
                  fluid={item.thumbnail}
                  alt={item.title}
                  />
              </figure>
              <h3 className="posts-item__title">{item.title}</h3>
              <time className="posts-item__time">{item.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Posts;
