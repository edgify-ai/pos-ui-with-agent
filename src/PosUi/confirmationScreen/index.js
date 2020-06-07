// @flow
import { connect } from 'react-redux';
import ChosenItem from './component';
import { addItemToReciept } from './actions';
import {
  getWeight,
  getPrediction,
  getGroundTruth,
  getItems,
} from '../../rootReducer';

const mapStateToProps = state => {
  let weight = getWeight(state);
  const prediction = getPrediction(state);
  const gt = getGroundTruth(state);
  const item = getItems(state)[gt]
  const price = item && item.price && '0.00'

  return {
    weight,
    label:item.label,
    gt,
    image:item.image,
    price,
    rawPrediction: prediction.raw
  };
};

const mapDispatchToProps = dispatch => ({
  addItemToReciept: (gt, rawPrediction) =>
    dispatch(addItemToReciept(gt, rawPrediction))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChosenItem);
