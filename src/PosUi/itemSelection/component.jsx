import React from 'react';
import './itemSelection.scss';
import Item from './Item';

const renderNoPredictedItems = (statusLabel = 'Place an item on the scale') => (
  <div>
    <div className="sectionTitle">Select the correct item</div>
    <div className="itemSelectionContainer">
      <div className="statusLabel">{statusLabel}</div>
    </div>
  </div>
);

const renderPredictedItems = (predictions, selectItem) => (
  <div className="predictedItemsOuterContainer">
    <div className="sectionTitle">Select the correct item:</div>
    <div className="predictedItemsContainer">
      {predictions.map((p) => {
        return <Item key={p.label} prediction={p} selectItem={selectItem} />;
      })}
    </div>
  </div>
);

const ItemSelection = ({
  unknownItem,
  noPredictedItems,
  predictions,
  selectItem,
}) => {
  if (unknownItem) {
    return renderNoPredictedItems('UNKNOWN ITEM, PLEASE SELECT FROM MENU');
  }
  if (noPredictedItems) {
    return renderNoPredictedItems();
  }
  return renderPredictedItems(predictions, selectItem);
};

export default ItemSelection;
