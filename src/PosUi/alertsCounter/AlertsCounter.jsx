import React from 'react';
import useAlertsCounterEffect from './hooks';
import './AlertsCounter.scss';

const AlertsCounter = ({ classname = '' }) => {
  const { value, resetAlerts } = useAlertsCounterEffect();
  if (!value) {
    return null;
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={`${classname} AlertsCounter`} onClick={resetAlerts}>
      <div className="number">{value}</div>
    </div>
  );
};

export default AlertsCounter;
