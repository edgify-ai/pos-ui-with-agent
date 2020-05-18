import {
  GET_PREDICTION_LOADING,
  GET_PREDICTION_SUCCESS,
  GET_PREDICTION_FAILURE,
  RESET_PREDICTION
} from './actions';

const defaultState = {
  data: {},
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
    case GET_PREDICTION_SUCCESS:
      return {
        ...state,
        data: {
          json: action.payload.toObject (),
          raw: action.payload,
        },
        loading: true,
        error: true,
      };
      case RESET_PREDICTION:
        return {
          ...state,
          data: {},
          loading: true,
          error: true,
        };
    default:
      return state;
  }
};

export const getPrediction = ({data}) => data;
export const getOriginalResponse = ({data}) => data.raw;
export const getCurrentImage = ({data}) => data.json && data.json.image.image;
export const getPredictionItems = ({data}) =>
  (data.json && data.json.predictionsList) || [];
