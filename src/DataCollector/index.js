// @flow
import { connect } from 'react-redux';
import _ from 'lodash';
import Component from './component';
import {
  getItems,
  getGroundTruths,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
  getPredictions,
  getMultiLabel,
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
  gt: getGroundTruths(state),
  createGroundTruthHasError: createGroundTruthHasError(state),
  createGroundTruthIsLoading: createGroundTruthIsLoading(state),
  multiLabel: getMultiLabel(state),
});

const mapDispatchToProps = (dispatch) => ({
  makePrediction: (config) => {
    dispatch(restoreDefault());
    dispatch(makePredictions(config));
  },
  resetPrediction: () => dispatch(resetPrediction()),
  setGroundTruth: (gt, index) => dispatch(setGroundTruth(gt, index)),
  addItemsToReciept: (gts, rawPrediction) => {
    const label = gts
      // eslint-disable-next-line camelcase
      .map((gt) => gt?.real_label)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, realLabel) => (realLabel ? `${acc}__${realLabel}` : acc));
    if (_.isEmpty(label)) {
      // eslint-disable-next-line no-alert
      alert('Please select a label');
      return;
    }
    dispatch(addItemsToReciept(label, rawPrediction, false));
  },
});

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
export default ConnectedComponent;
