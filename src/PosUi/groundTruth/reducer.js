import { SET_GROUND_TRUTH, RESET_GROUND_TRUTH } from './actions';

const defaultState = {
  data: [{}],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_GROUND_TRUTH: {
      const { index, value } = action.payload;
      const data = [...state.data];
      data[index] = value ?? {};
      return {
        ...state,
        data,
      };
    }
    case RESET_GROUND_TRUTH:
      return defaultState;
    default:
      return state;
  }
};

export const getGroundTruth = ({ data }) => data[0];
export const getGroundTruths = ({ data }) => data;
