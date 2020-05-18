import {SET_WEIGHT} from './actions';

const defaultState = {
  data: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_WEIGHT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const getWeight = ({data}) => data;
