import { ALERTS_RESET, ALERTS_INCREASE } from './actions';

export default (state = 0, action) => {
  switch (action.type) {
    case ALERTS_INCREASE:
      return state + 1;
    case ALERTS_RESET:
      return 0;
    default:
      return state;
  }
};

export const getAlertsCounter = (alertsCounter) => alertsCounter;
