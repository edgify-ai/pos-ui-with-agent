export const SET_GROUND_TRUTH = 'SET_GROUND_TRUTH';
export const RESET_GROUND_TRUTH = 'SET_GROUND_TRUTH';

export const setGroundTruth = (gt, index = 0) => ({
  type: SET_GROUND_TRUTH,
  payload: {
    index,
    value: gt,
  },
});

export const resetGroundTruth = () => ({
  type: RESET_GROUND_TRUTH,
});
