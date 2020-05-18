// @flow
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { lifecycle, compose } from 'recompose';
import PosUI from './component';
import {getPredictionImage} from '../rootReducer';
import {makePrediction,resetPrediction} from "./prediction/actions"
import {setRandomWeightValue, resetWeightValue} from './weight/actions'


const mapStateToProps = state => ({
  currentImage: getPredictionImage (state),
});

const mapDispatchToProps = (dispatch) => ({
  makePrediction: () => {
    dispatch(makePrediction())
    dispatch(setRandomWeightValue())
  },
  resetWeightValue: () => dispatch(resetWeightValue()),
  resetPrediction: () => dispatch(resetPrediction())
})

const Enhancer = compose(
  lifecycle({
    componentDidMount() {
      this.props.resetWeightValue();
      this.props.resetPrediction();
    }
  })
);
const EnhancedComponent = Enhancer(PosUI);

const ConnectedComponent = withRouter (connect (mapStateToProps, mapDispatchToProps) (EnhancedComponent));
export default ConnectedComponent;
