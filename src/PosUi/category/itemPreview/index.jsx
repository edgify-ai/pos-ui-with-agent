import React from 'react';
import { Link } from 'react-router-dom';
import './itemPreview.scss';

const ItemPreview = ({ item, setGroundTruth }) => {
  return (
    <div className="itemPreviewContainer">
      <Link
        id={`${item.label}_button`}
        to="/confirmation"
        onClick={() => {
          setGroundTruth();
        }}
      >
        <img className="itemPreviewImage" src={item.image} alt={item.label} />
      </Link>
      <div className="itemPreviewLabel">{item.label}</div>
    </div>
  );
};

export default ItemPreview;
