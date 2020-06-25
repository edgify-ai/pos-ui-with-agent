// @flow
import { connect } from 'react-redux';
import ChosenItem from './component';
import { addItemsToReciept } from './actions';
import {
  getWeight,
  getPredictions,
  getGroundTruth,
  getItems,
} from '../../rootReducer';

const mapStateToProps = state => {
  let weight = getWeight(state);
  const prediction = getPredictions(state)[0];
  const gt = getGroundTruth(state);
  const item = getItems(state)[gt]
  const price = item && item.price && '0.00'

  return {
    weight,
    label:item.label,
    gt,
    image:item.image,
    price,
    prediction
  };
};

const mapDispatchToProps = dispatch => ({
  addItemToReciept: (gt, prediction) =>
    dispatch(addItemsToReciept(gt, [prediction]))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChosenItem);
