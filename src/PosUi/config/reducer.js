const thresholdKey = 'threshold';
const maxPredictionsKey = 'maxPredictions';
const alertThresholdKey = 'fraudConf';
const multiLabelKey = 'multiLabel';
const itemThresholdKey = 'itemThresh';
const showConfKey = 'showConf';

const queryParams = new URLSearchParams(window.location.search);

const getNumberFromParam = (param, defaultValue) => +param || defaultValue;

const getMultiLabelFromParam = (param, defaultValue) => {
  if (!param || param === 'false') {
    return 1;
  }
  return param === 'true' ? 2 : +param || defaultValue;
};

const getBooleanFromParam = (param, defaultValue) => {
  switch (param) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return defaultValue;
  }
};

const getValueFromKey = (key, defaultValue, transform = getNumberFromParam) => {
  const strValue = queryParams.get(key);
  if (strValue) {
    localStorage.setItem(key, strValue);
    return transform(strValue, defaultValue);
  }
  return transform(localStorage.getItem(key), defaultValue);
};

const maxTopPredictions = getValueFromKey(maxPredictionsKey, 5);
const accuracyThreshold = getValueFromKey(thresholdKey, 0.5);
const alertThreshold = getValueFromKey(alertThresholdKey, 1);
const itemThreshold = getValueFromKey(itemThresholdKey, 0);
const multiLabel = getValueFromKey(multiLabelKey, 1, getMultiLabelFromParam);
const showConfidenceScore = getValueFromKey(
  showConfKey,
  false,
  getBooleanFromParam
);

const config = {
  maxTopPredictions,
  accuracyThreshold,
  alertThreshold,
  multiLabel,
  itemThreshold,
  showConfidenceScore,
};

export default (state = config) => {
  return state;
};

export const getMaxTopPredictions = (state) => state.maxTopPredictions;
export const getAccuracyThreshold = (state) => state.accuracyThreshold;
export const getMultiLabel = (state) => state.multiLabel;
export const getItemThreshold = (state) => state.itemThreshold;
export const getShowConfidenceScore = (state) => state.showConfidenceScore;
