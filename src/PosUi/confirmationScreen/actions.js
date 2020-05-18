import {createGroundTruth} from "../../EdgifyClient"
import history from "../../config/history"

export const CREATE_GROUND_TRUE_LOADING = 'CREATE_GROUND_TRUE_LOADING';
export const CREATE_GROUND_TRUE_SUCCESS = 'CREATE_GROUND_TRUE_SUCCESS';
export const CREATE_GROUND_TRUE_FAILURE = 'CREATE_GROUND_TRUE_FAILURE';

export const addItemToReciept = (gt, rawPrediction) => async dispatch => {
  dispatch({
    type: CREATE_GROUND_TRUE_LOADING
  });
  try {
    await createGroundTruth(gt, rawPrediction)
    dispatch({
      type: CREATE_GROUND_TRUE_SUCCESS
    });
    history.push("/")
  } catch (e) {
    dispatch({
      type: CREATE_GROUND_TRUE_FAILURE
    });
  }
};
