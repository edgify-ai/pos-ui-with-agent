import { SET_GROUND_TRUTH } from './actions';

const defaultState = {
  data: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_GROUND_TRUTH:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getGroundTruth = ({ data }) => data;
