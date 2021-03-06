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

const renderPredictedItems = (predictions, showConfidenceScore, selectItem) => (
  <div className="predictedItemsOuterContainer">
    <div className="sectionTitle">Select the correct item:</div>
    <div className="predictedItemsContainer">
      {predictions.map((p) => {
        return (
          <Item
            key={p.label}
            prediction={p}
            selectItem={selectItem}
            showConfidenceScore={showConfidenceScore}
          />
        );
      })}
    </div>
  </div>
);

const ItemSelection = ({
  unknownItem,
  bagCovers,
  noPredictedItems,
  predictions,
  showConfidenceScore,
  selectItem,
}) => {
  if (unknownItem) {
    return renderNoPredictedItems('UNKNOWN ITEM, PLEASE SELECT FROM MENU');
  }
  if (bagCovers) {
    return renderNoPredictedItems(
      'A bag is covering the field of view - please place the item again'
    );
  }
  if (noPredictedItems) {
    return renderNoPredictedItems();
  }
  return renderPredictedItems(predictions, showConfidenceScore, selectItem);
};

export default ItemSelection;
