import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import Label from '../../../config/site-labels';
import './style.scss';

const SearchResult = ({ focus, value }) => {
  const tempData = useStaticQuery(
    graphql`
    query SearchQuery {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              description
              category
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
    `
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    tempData.allMarkdownRemark.edges.map(e => {
      temp.push({
        id: e.node.id,
        title: e.node.frontmatter.title,
        description: e.node.frontmatter.description,
        excerpt: e.node.excerpt,
        category: e.node.frontmatter.category,
        tags: e.node.frontmatter.tags,
        path: e.node.fields.slug
      });
      return temp;
    });
    setData(temp);
  }, [tempData.allMarkdownRemark.edges]);

  const [className, setClassName] = useState("");
  useEffect(() => {
    let id;
    if (focus && value !== "") {
      id = setTimeout(() => {
        setClassName("result-active")
      }, 100);
    } else {
      id = setTimeout(() => {
        setClassName("")
      }, 100);
    }
    return () => {
      clearTimeout(id);
    };
  }, [focus, value]);

  const [result, setResult] = useState([]);
  useEffect(() => {
    if (value !== "") {
      const search = () => {
        const result = value.toLowerCase();
        const temp = data.filter(e => {
          const target = `
          ${e.title.toLowerCase()}
          ${e.description.toLowerCase()}
          ${e.excerpt.toLowerCase()}
          ${e.category.toLowerCase()}
          ${e.tags.join(" ").toLowerCase()}
          `
          return target.indexOf(result) !== -1;
        });
        setResult(temp);
      };
      search();
    }
  }, [value, data]);

  return (
    <div className={className}>
      <div className="result__inner">
        <div className="result__count">
          <span>{Label.searchResult} : {result.length}</span>
        </div>
        <ul className="result__lists">
          {result.map(e =>
            <li key={e.id}>
              <Link to={`${e.path}`}>
                {e.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const Search = (props) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const onFocus = () => {
    setFocus(true)
  };
  const onBlur = () => {
    setFocus(false)
  };
  const onChange = (e) => {
    setValue(e.target.value)
  };

  return (
    <div className="search__wrapper">
      <svg aria-hidden="true" focusable="false" width="14" height="14" className="search__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
      <input
        type="search"
        aria-label="text"
        placeholder={Label.searchLabel}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className="search__form"
        />
      <SearchResult
        focus={focus}
        value={value}
        />
    </div>
  );
};

export default Search;
