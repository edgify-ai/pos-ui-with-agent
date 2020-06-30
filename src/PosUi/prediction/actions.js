import { toastr } from 'react-redux-toastr';
import * as EdgifyClient from '../../EdgifyClients';

export const GET_PREDICTION_LOADING = 'GET_PREDICTION_LOADING';
export const GET_PREDICTIONS_SUCCESS = 'GET_PREDICTIONS_SUCCESS';
export const GET_PREDICTION_SUCCESS = 'GET_PREDICTION_SUCCESS';
export const GET_PREDICTION_FAILURE = 'GET_PREDICTION_FAILURE';
export const RESET_PREDICTION = 'RESET_PREDICTION';

const makePrediction = async (config, dispatch) => {
  const { prediction } = await EdgifyClient.makePrediction(config);
  const raw = prediction.getPrediction();
  dispatch({
    type: GET_PREDICTION_SUCCESS,
    payload: {
      json: raw.toObject(),
      raw,
      config,
    },
  });
};

// eslint-disable-next-line consistent-return
export const makePredictions = (clientConfig) => async (dispatch) => {
  dispatch({
    type: GET_PREDICTION_LOADING,
  });
  try {
    if (clientConfig) {
      return await makePrediction(clientConfig, dispatch);
    }
    const responsePredictions = await EdgifyClient.makePredictions();
    const timestamp = responsePredictions[0].prediction.getPrediction()
      .array[2];
    const predictions = responsePredictions.map(({ prediction, config }) => {
      const raw = prediction.getPrediction();
      raw.array[2] = timestamp;
      return {
        json: raw.toObject(),
        raw,
        config,
      };
    });
    dispatch({
      type: GET_PREDICTIONS_SUCCESS,
      payload: predictions,
    });
  } catch (e) {
    toastr.error(
      'Failed to make predictions',
      'Please check your connection config'
    );
    dispatch({
      type: GET_PREDICTION_FAILURE,
      payload: e,
    });
  }
};

export const resetPrediction = () => async (dispatch) => {
  dispatch({
    type: RESET_PREDICTION,
  });
};
