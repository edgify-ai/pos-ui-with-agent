import * as EdgifyClient from '../../EdgifyClients';

export const GET_PREDICTION_LOADING = 'GET_PREDICTION_LOADING';
export const GET_PREDICTIONS_SUCCESS = 'GET_PREDICTIONS_SUCCESS';
export const GET_PREDICTION_SUCCESS = 'GET_PREDICTION_SUCCESS';
export const GET_PREDICTION_FAILURE = 'GET_PREDICTION_FAILURE';
export const RESET_PREDICTION = 'RESET_PREDICTION';

const makePrediction = async (port, dispatch) => {
  const { prediction } = await EdgifyClient.makePrediction(port);
  const raw = prediction.getPrediction();
  dispatch({
    type: GET_PREDICTION_SUCCESS,
    payload: {
      json: raw.toObject(),
      raw,
      port,
    },
  });
};

// eslint-disable-next-line consistent-return
export const makePredictions = (clientPort) => async (dispatch) => {
  dispatch({
    type: GET_PREDICTION_LOADING,
  });
  try {
    if (clientPort) {
      return await makePrediction(clientPort, dispatch);
    }
    const predictions = (await EdgifyClient.makePredictions()).map(
      ({ prediction, port }) => {
        const raw = prediction.getPrediction();
        return {
          json: raw.toObject(),
          raw,
          port,
        };
      }
    );
    dispatch({
      type: GET_PREDICTIONS_SUCCESS,
      payload: predictions,
    });
  } catch (e) {
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
