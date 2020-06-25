// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './category.scss';

const renderCategory = ({ name, style }) => {
  if (!name && !style) {
    return <div />;
  }
  if (style === 'moreOptions') {
    return <div className="moreOptions" />;
  }

  return (
    <div>
      <Link to={`/category/${name}`}>
        <div className={`categoryImage-${name}`} />
        <div className="categoryLabel">{name}</div>
      </Link>
    </div>
  );
};

const Category = ({ props }) => {
  return <div className="categoryItem">{renderCategory(props)}</div>;
};

export default Category;
