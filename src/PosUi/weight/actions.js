export const SET_WEIGHT = 'SET_WEIGHT';

export const setRandomWeightValue = () => ({
  type: SET_WEIGHT,
  payload: (Math.random() * 5.0 + 0.2).toFixed(2),
});

export const resetWeightValue = () => ({
  type: SET_WEIGHT,
  payload: 0,
});
