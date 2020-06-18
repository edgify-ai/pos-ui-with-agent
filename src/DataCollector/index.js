// @flow
import {connect} from 'react-redux';
import Component from './component';
import {
  getPredictionImages,
  getItems,
  getRawPredictions,
  getGroundTruth,
  createGroundTruthHasError,
  createGroundTruthIsLoading
} from '../rootReducer';
import {makePrediction, resetPrediction} from '../PosUi/prediction/actions';
import {setGroundTruth} from '../PosUi/groundTruth/actions';
import {addItemsToReciept} from '../PosUi/confirmationScreen/actions'
import {restoreDefault} from '../PosUi/confirmationScreen/actions'
import _ from "lodash"

const mapStateToProps = state => ({
  currentImages: getPredictionImages(state),
  items: getItems (state),
  gt: getGroundTruth(state),
  rawPredictions: getRawPredictions(state),
  createGroundTruthHasError: createGroundTruthHasError(state),
  createGroundTruthIsLoading: createGroundTruthIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  makePrediction: () => {
    dispatch (restoreDefault())
    dispatch (makePrediction ());
  },
  resetPrediction: () => dispatch (resetPrediction ()),
  setGroundTruth: (gt) => dispatch(setGroundTruth(gt)),
  addItemsToReciept: (gt, rawPrediction) => {
    if (_.isEmpty(gt)) {
      alert("Please select a label")
      return
    }
    dispatch(addItemsToReciept(gt.real_label, rawPrediction, false))
  }
});

const ConnectedComponent = connect (mapStateToProps, mapDispatchToProps) (
    Component
);
export default ConnectedComponent;
