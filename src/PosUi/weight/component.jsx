import React from 'react';
import './weight.scss';

const Weight = ({ weight, onClickHandler }) => (
  <div className="weightContainer">
    <div
      role="button"
      tabIndex={0}
      className={
        weight > 0 ? 'weightScaleContainer active' : 'weightScaleContainer'
      }
      onClick={onClickHandler}
    >
      <div className="weightLabel">WEIGHT(kg)</div>
      <div className="weightValueLabel">{weight}</div>
    </div>
  </div>
);

export default Weight;
