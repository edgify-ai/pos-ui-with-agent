// @flow
import React from 'react';
import Category from './category';
import './categories.scss';

const renderRow = (categories, rowIndex) => {
  let i = 0;
  if (rowIndex === 1) {
    i = 3;
  }

  return (
    <tr>
      <td>
        <Category props={categories[i]} />
      </td>
      <td>
        <Category props={categories[i + 1]} />
      </td>
      <td>
        <Category props={categories[i + 2]} />
      </td>
    </tr>
  );
};

const Categories = ({ categories }) => (
  <div className="categoriesContainer">
    <table cellPadding="0">
      <tbody>
        {renderRow(categories, 0)}
        {renderRow(categories, 1)}
      </tbody>
    </table>
  </div>
);

export default Categories;
