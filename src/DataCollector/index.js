// @flow
import {connect} from 'react-redux';
import {lifecycle, compose} from 'recompose';
import Component from './component';
import {
  getPredictionImage, 
  getItems, 
  getPrediction, 
  getGroundTruth,
  createGroundTruthHasError,
  createGroundTruthIsLoading
} from '../rootReducer';
import {makePrediction, resetPrediction} from '../PosUi/prediction/actions';
import {setGroundTruth} from '../PosUi/groundTruth/actions';
import {addItemToReciept} from '../PosUi/confirmationScreen/actions'
import {restoreDefault} from '../PosUi/confirmationScreen/actions'
import _ from "lodash"
import {toastr} from 'react-redux-toastr'

const mapStateToProps = state => ({
  currentImage: getPredictionImage (state),
  items: getItems (state),
  gt: getGroundTruth(state),
  rawPrediction: getPrediction(state).raw,
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
  addItemToReciept: (gt, rawPrediction) => {
    if (_.isEmpty(gt)) {
      alert("Please select a label")
      return
    }
    dispatch(addItemToReciept(gt.real_label, rawPrediction, false))
  }
});

const Enhancer = compose (
  lifecycle ({
    componentDidMount () {
      this.props.makePrediction ();
    },
    componentWillUpdate(nextProps) {
      if (!this.props.createGroundTruthHasError && nextProps.createGroundTruthHasError) {
        toastr.error("Failed to store ground truth. Probably you use this snapshot already. Or check if agent is running", {timeOut: 0})
      }
      if (this.props.createGroundTruthIsLoading && 
        !nextProps.createGroundTruthIsLoading && 
        !nextProps.createGroundTruthHasError) {
          toastr.success("Sample stored")
      }
    }
  })
);
const EnhancedComponent = Enhancer (Component);

const ConnectedComponent = connect (mapStateToProps, mapDispatchToProps) (
  EnhancedComponent
);
export default ConnectedComponent;
