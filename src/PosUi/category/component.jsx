// @flow
import React from 'react';
import ItemPreview from './itemPreview/';
import Header from '../header';
import './items.scss';

const renderItems = (items, category, setGroundTruth) => {
  // devide the data to parts of 6 items
  let start = 0;
  const parts = [];
  const interval = 6;
  items = Object.values(items)
  while (start < items.length) {
    const slice = items.slice(start, start + interval);

    parts.push(slice);
    start += interval;
  }
  return parts.map(part => (
    <tr key={Math.floor(Math.random() * 100)}>
      {part.map(item => (
        <td key={item.label}>
          <ItemPreview item={item} setGroundTruth={() => setGroundTruth(item.key)}/>
        </td>
      ))}
    </tr>
  ));
};

const Items = ({ items, category, setGroundTruth }: Props) => {
  return (
    <div className="ItemsComponent">
      <div>
        <Header showBackButton />
      </div>
      <div className="categoryName">{category}</div>
      <div className="ItemsSubtitle">Select the correct item:</div>
      <table cellPadding="0" className="itemsComponentTable">
        <tbody>
          {renderItems(items, category, setGroundTruth)}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
