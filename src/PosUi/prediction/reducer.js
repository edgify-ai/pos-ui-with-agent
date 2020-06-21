import {
  GET_PREDICTION_LOADING,
  GET_PREDICTIONS_SUCCESS,
  GET_PREDICTION_SUCCESS,
  GET_PREDICTION_FAILURE,
  RESET_PREDICTION
} from './actions';

const defaultState = {
  predictions: [],
  loading: false,
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_PREDICTION_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_PREDICTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_PREDICTIONS_SUCCESS:
      return {
        predictions: action.payload,
        loading: false,
        error: false,
      };
    case GET_PREDICTION_SUCCESS:
      return {
        predictions: state.predictions.map(prediction => prediction.port === action.payload.port ? action.payload : prediction),
        loading: false,
        error: false,
      };
    case RESET_PREDICTION:
        return defaultState;
    default:
      return state;
  }
};

export const getPredictions = ({predictions}) => predictions
export const getOriginalResponses = ({predictions}) => predictions.map(({raw}) => raw);
export const getCurrentImages = ({predictions}) => predictions.map(({json}) => json?.image.image);
export const getPredictionItems = ({predictions}) => predictions.map(({json}) => (json?.predictionsList) || []);
