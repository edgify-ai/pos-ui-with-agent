import { GroundTruth, SET_GROUND_TRUTH, GroundTruthActionTypes } from './types';

export const setGroundTruth = (gt: GroundTruth): GroundTruthActionTypes => ({
  type: SET_GROUND_TRUTH,
  payload: gt,
});

export const resetGroundTruth = (): GroundTruthActionTypes => ({
  type: SET_GROUND_TRUTH,
  payload: {},
});
