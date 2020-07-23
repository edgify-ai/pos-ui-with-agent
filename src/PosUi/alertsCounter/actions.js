export const ALERTS_RESET = 'ALERTS_RESET';
export const ALERTS_INCREASE = 'ALERTS_INCREASE';

const OTHER_FRUIT_LABEL = 'OtherFruit';
const NO_FRUIT_LABEL = 'NoFruit';
const BAG_COVER = 'BagCover';

export const resetAlerts = () => (dispatch) => {
  dispatch({
    type: ALERTS_RESET,
  });
};

export const increaseAlertsIfNeeded = (gt) => (dispatch, getState) => {
  const state = getState();
  const { alertThreshold } = state.alertsCounter;
  const firstGuess =
    state.prediction.predictions[0]?.json.predictionsList?.[0]?.dataList;
  const firstLabel = firstGuess?.[0];
  const accuracy = firstGuess?.[1];
  const shouldAlert =
    ![OTHER_FRUIT_LABEL, NO_FRUIT_LABEL, BAG_COVER, gt].includes(firstLabel) &&
    accuracy > alertThreshold;
  if (shouldAlert) {
    dispatch({
      type: ALERTS_INCREASE,
    });
  }
};
