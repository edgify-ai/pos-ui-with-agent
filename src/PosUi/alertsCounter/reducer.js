import { ALERTS_RESET, ALERTS_INCREASE } from './actions';

const alertThreshold = (() => {
  const thresholdKey = 'fraudConf';
  const queryParams = new URLSearchParams(window.location.search);
  const threshold = queryParams.get(thresholdKey);
  return parseFloat(threshold) || 1;
})();

const defaultState = {
  counter: 0,
  alertThreshold,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ALERTS_INCREASE:
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    case ALERTS_RESET:
      return defaultState;
    default:
      return state;
  }
};

export const getAlertsCounter = (alertsCounter) => alertsCounter.counter;
