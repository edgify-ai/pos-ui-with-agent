export const SET_GROUND_TRUTH = 'SET_GROUND_TRUTH';

export interface GroundTruth {
  image?: string;
  label?: string;
  price?: number;
  // eslint-disable-next-line camelcase
  real_label?: string;
}

export interface GroundTruthState {
  data: GroundTruth;
}

interface SetGroundTruthAction {
  type: typeof SET_GROUND_TRUTH;
  payload: GroundTruth;
}

interface ResetGroundTruthAction {
  type: typeof SET_GROUND_TRUTH;
  payload: object;
}

export type GroundTruthActionTypes =
  | SetGroundTruthAction
  | ResetGroundTruthAction;
