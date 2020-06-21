// @flow
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { lifecycle, compose } from 'recompose';
import PosUI from './component';
import {getPredictionImages} from '../rootReducer';
import {makePredictions,resetPrediction} from "./prediction/actions"
import {setRandomWeightValue, resetWeightValue} from './weight/actions'


const mapStateToProps = state => ({
  currentImage: getPredictionImages(state)[0],
});

const mapDispatchToProps = (dispatch) => ({
  makePrediction: () => {
    dispatch(makePredictions())
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
      this.props.makePrediction();
    }
  })
);
const EnhancedComponent = Enhancer(PosUI);

const ConnectedComponent = withRouter (connect (mapStateToProps, mapDispatchToProps) (EnhancedComponent));
export default ConnectedComponent;
