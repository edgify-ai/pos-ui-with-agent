import {
  GroundTruth,
  GroundTruthState,
  GroundTruthActionTypes,
  SET_GROUND_TRUTH,
} from './types';

const defaultState: GroundTruthState = {
  data: {},
};

export default (
  state = defaultState,
  action: GroundTruthActionTypes
): GroundTruthState => {
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

export const getGroundTruth = ({ data }: GroundTruthState): GroundTruth => data;
