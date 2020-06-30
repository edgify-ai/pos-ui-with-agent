export const SET_GROUND_TRUTH = 'SET_GROUND_TRUTH';

export const setGroundTruth = (gt) => ({
  type: SET_GROUND_TRUTH,
  payload: gt,
});

export const resetGroundTruth = () => ({
  type: SET_GROUND_TRUTH,
  payload: {},
});
