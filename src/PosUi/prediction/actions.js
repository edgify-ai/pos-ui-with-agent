import * as EdgifyClient from '../../EdgifyClients';
export const GET_PREDICTION_LOADING = 'GET_PREDICTION_LOADING';
export const GET_PREDICTION_SUCCESS = 'GET_PREDICTION_SUCCESS';
export const GET_PREDICTION_FAILURE = 'GET_PREDICTION_FAILURE';
export const RESET_PREDICTION = 'RESET_PREDICTION';

export const makePrediction = () => async dispatch => {
  dispatch ({
    type: GET_PREDICTION_LOADING,
  });
  try {
    const predictions = (await EdgifyClient.makePredictions()).map(prediction => {
      const raw = prediction.getPrediction ()
      return {
        json: raw.toObject (),
        raw
      }
    });
    dispatch ({
      type: GET_PREDICTION_SUCCESS,
      payload: predictions,
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
