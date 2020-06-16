import {createGroundTruth} from "../../EdgifyClients"
import history from "../../config/history"

export const CREATE_GROUND_TRUE_LOADING = 'CREATE_GROUND_TRUE_LOADING';
export const CREATE_GROUND_TRUE_SUCCESS = 'CREATE_GROUND_TRUE_SUCCESS';
export const CREATE_GROUND_TRUE_FAILURE = 'CREATE_GROUND_TRUE_FAILURE';
export const CREATE_GROUND_TRUTH_RESTORE_DEFAULT = 'CREATE_GROUND_TRUTH_RESTORE_DEFAULT'

export const addItemsToReciept = (gt, rawPredictions, redirect=true) => async dispatch => {
  dispatch({
    type: CREATE_GROUND_TRUE_LOADING
  });
  try {
    await createGroundTruth(gt, rawPredictions)
    dispatch({
      type: CREATE_GROUND_TRUE_SUCCESS
    });
    if (redirect) {
      history.push("/")
    }
  } catch (e) {
    console.error(e)
    dispatch({
      type: CREATE_GROUND_TRUE_FAILURE
    });
  }
};

export const restoreDefault = () => ({
  type: CREATE_GROUND_TRUTH_RESTORE_DEFAULT
});