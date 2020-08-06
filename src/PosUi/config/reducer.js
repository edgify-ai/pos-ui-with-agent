const thresholdKey = 'threshold';
const maxPredictionsKey = 'maxPredictions';
const alertThresholdKey = 'fraudConf';
const multiLabelKey = 'multiLabel';

const queryParams = new URLSearchParams(window.location.search);

const maxTopPredictions = (() => {
  let q = queryParams.get(maxPredictionsKey);
  if (q) {
    q = parseInt(q, 10);
    localStorage.setItem(maxPredictionsKey, q);
    return q;
  }
  const ls = localStorage.getItem(maxPredictionsKey);
  if (ls) {
    return +ls;
  }

  return 5;
})();

const accuracyThreshold = (() => {
  let q = queryParams.get(thresholdKey);
  if (q) {
    q = parseFloat(q);
    localStorage.setItem(thresholdKey, q);
    return +q;
  }
  const ls = localStorage.getItem(thresholdKey);
  if (ls) {
    return +ls;
  }
  return 0.5;
})();

const alertThreshold = (() => {
  const threshold = queryParams.get(alertThresholdKey);
  if (threshold) {
    localStorage.setItem(alertThresholdKey, threshold);
    return +threshold;
  }
  return +localStorage.getItem(alertThresholdKey) || 1;
})();

const getMultiLabelFromParam = (param) => {
  if (!param || param === 'false') {
    return 1;
  }
  return param === 'true' ? 2 : +param || 1;
};
const multiLabel = (() => {
  const multiLabelParam = queryParams.get(multiLabelKey);
  if (multiLabelParam) {
    localStorage.setItem(multiLabelKey, multiLabelParam);
    return getMultiLabelFromParam(multiLabelParam);
  }
  return getMultiLabelFromParam(localStorage.getItem(multiLabelKey));
})();

const config = {
  maxTopPredictions,
  accuracyThreshold,
  alertThreshold,
  multiLabel,
};

export default (state = config) => {
  return state;
};

export const getMaxTopPredictions = (state) => state.maxTopPredictions;
export const getAccuracyThreshold = (state) => state.accuracyThreshold;
export const getMultiLabel = (state) => state.multiLabel;
