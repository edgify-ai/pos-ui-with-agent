import React from 'react';
import { Link } from 'react-router-dom';
import './item.scss';

const Item = ({
  prediction: { label, textLabel, accuracy, image },
  selectItem,
  showConfidenceScore,
}) => {
  const width = '18%';
  const height = '100px';
  return (
    <div className="itemContainer" style={{ width }}>
      <Link
        id={`${label}_button`}
        to="/confirmation"
        onClick={() => selectItem(label)}
      >
        {/* This is were I need to change the image tag to use the preloaded image */}
        <img className="itemImage" src={image} alt={label} style={{ height }} />
        <div className="itemLabel">{textLabel}</div>
        {showConfidenceScore && (
          <div className="itemLabel itemAccuracy">{accuracy}</div>
        )}
      </Link>
    </div>
  );
};

export default Item;
