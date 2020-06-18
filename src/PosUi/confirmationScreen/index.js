// @flow
import { connect } from 'react-redux';
import ChosenItem from './component';
import { addItemsToReciept } from './actions';
import {
  getWeight,
  getRawPredictions,
  getGroundTruth,
  getItems,
} from '../../rootReducer';

const mapStateToProps = state => {
  let weight = getWeight(state);
  const rawPrediction = getRawPredictions(state)[0];
  const gt = getGroundTruth(state);
  const item = getItems(state)[gt]
  const price = item && item.price && '0.00'

  return {
    weight,
    label:item.label,
    gt,
    image:item.image,
    price,
    rawPrediction
  };
};

const mapDispatchToProps = dispatch => ({
  addItemToReciept: (gt, rawPrediction) =>
    dispatch(addItemsToReciept(gt, [rawPrediction]))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChosenItem);
