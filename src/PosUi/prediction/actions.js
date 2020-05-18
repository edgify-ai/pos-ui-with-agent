import * as EdgifyClient from '../../EdgifyClient';
export const GET_PREDICTION_LOADING = 'GET_PREDICTION_LOADING';
export const GET_PREDICTION_SUCCESS = 'GET_PREDICTION_SUCCESS';
export const GET_PREDICTION_FAILURE = 'GET_PREDICTION_FAILURE';
export const RESET_PREDICTION = 'RESET_PREDICTION';

export const makePrediction = () => async dispatch => {
  dispatch ({
    type: GET_PREDICTION_LOADING,
  });
  try {
    const prediction = await EdgifyClient.makePrediction ();
    dispatch ({
      type: GET_PREDICTION_SUCCESS,
      payload: prediction.getPrediction (),
    });
  } catch (e) {
    dispatch ({
      type: GET_PREDICTION_FAILURE,
      payload: e,
    });
  }
};

export const resetPrediction = () => async dispatch => {
  dispatch ({
    type: RESET_PREDICTION,
  });
};
