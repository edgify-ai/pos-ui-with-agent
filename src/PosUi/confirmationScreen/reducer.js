import {
  CREATE_GROUND_TRUE_LOADING,
  CREATE_GROUND_TRUE_SUCCESS,
  CREATE_GROUND_TRUE_FAILURE,
  CREATE_GROUND_TRUTH_RESTORE_DEFAULT,
} from './actions';

const defaultState = {
  loading: false,
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_GROUND_TRUTH_RESTORE_DEFAULT:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case CREATE_GROUND_TRUE_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_GROUND_TRUE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case CREATE_GROUND_TRUE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const isLoading = ({ loading }) => loading;
export const hasError = ({ error }) => error;
