// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import './category.scss';

const renderCategory = props => {
  if (!props) {
    return <div />;
  }
  if (props && props.style && props.style === 'moreOptions') {
    return <div className="moreOptions" />;
  }

  return (
    <div>
      <Link to={`/category/${props.name}`}>
        <div className={`categoryImage-${props.name}`} />
        <div className="categoryLabel">{props.name}</div>
      </Link>
    </div>
  );
};

const Category = ({props}: Props) => {
  return <div className={`categoryItem`}>{renderCategory (props)}</div>;
};

export default Category;
