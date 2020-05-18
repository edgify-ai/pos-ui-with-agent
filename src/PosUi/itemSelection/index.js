// @flow
import {connect} from 'react-redux';
import ItemSelection from './component';
import {setGroundTruth} from '../groundTruth/actions';

import {
  getPredictionItems,
  getMaxTopPredictions,
  getAccuracyThreshold,
  getItems
} from '../../rootReducer';
import _ from 'lodash';

const OTHER_FRUIT_LABEL = 'OtherFruit';

const mapStateToProps = (state, ownProps) => {
  let allPredictions = getPredictionItems (state);
  if (_.isEmpty (allPredictions)) {
    return {
      unknownItem: false,
      noPredictedItems: true,
      predictions: [],
    };
  }
  const maxTopPredictions = getMaxTopPredictions (state);

  let topTotalAUC = 0;

  if (allPredictions[0].dataList[0] !== OTHER_FRUIT_LABEL) {
    allPredictions = allPredictions.filter (prediction => {
      return prediction.dataList[0] !== OTHER_FRUIT_LABEL;
    });
  }

  const size = _.min([allPredictions.length, maxTopPredictions])
  for (let i = 0; i < size; ++i) {
    topTotalAUC = topTotalAUC + Number.parseFloat (allPredictions[i].dataList[1]);
  }

  const unknownItem =
    allPredictions &&
    allPredictions[0] &&
    allPredictions[0].dataList[0] === 'OtherFruit';

  const allItems = getItems(state)
  return {
    predictions: allPredictions.slice (0, size).map(({dataList: p}) => {
      const label = p[0]
      const accuracy = +p[1]
      return {
        label,
        accuracy,
        image: (allItems[label] && allItems[label].image) || ''
      }
    }),
    noPredictedItems: topTotalAUC < getAccuracyThreshold (state),
    unknownItem,
  };
};

const mapDispatchToProps = {
  selectItem: setGroundTruth,
};

export default connect (mapStateToProps, mapDispatchToProps) (ItemSelection);
