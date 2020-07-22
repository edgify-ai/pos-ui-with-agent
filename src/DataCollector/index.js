// @flow
import { connect } from 'react-redux';
import _ from 'lodash';
import Component from './component';
import {
  getItems,
  getGroundTruth,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
  getPredictions,
} from '../rootReducer';
import { makePredictions, resetPrediction } from '../PosUi/prediction/actions';
import { setGroundTruth } from '../PosUi/groundTruth/actions';
import {
  addItemsToReciept,
  restoreDefault,
} from '../PosUi/confirmationScreen/actions';

const mapStateToProps = (state) => ({
  predictions: getPredictions(state),
  items: getItems(state),
  gt: getGroundTruth(state),
  createGroundTruthHasError: createGroundTruthHasError(state),
  createGroundTruthIsLoading: createGroundTruthIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  makePrediction: (config) => {
    dispatch(restoreDefault());
    dispatch(makePredictions(config));
  },
  resetPrediction: () => dispatch(resetPrediction()),
  setGroundTruth: (gt) => dispatch(setGroundTruth(gt)),
  addItemsToReciept: (gt, rawPrediction) => {
    if (_.isEmpty(gt)) {
      // eslint-disable-next-line no-alert
      alert('Please select a label');
      return;
    }
    dispatch(addItemsToReciept(gt.real_label, rawPrediction, false));
  },
});

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
export default ConnectedComponent;
