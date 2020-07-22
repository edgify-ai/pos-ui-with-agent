import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAlertsCounter } from '../../rootReducer';
import { resetAlerts } from './actions';
import './AlertsCounter.scss';

const AlertsCounter = ({ classname = '' }) => {
  const counter = useSelector(getAlertsCounter);
  const dispatch = useDispatch();
  if (!counter) {
    return null;
  }
  const value = counter > 99 ? '99+' : counter;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`${classname} AlertsCounter`}
      onClick={() => dispatch(resetAlerts())}
    >
      <div className="number">{value}</div>
    </div>
  );
};

export default AlertsCounter;
