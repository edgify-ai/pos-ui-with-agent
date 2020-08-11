// @flow
import { connect } from 'react-redux';
import _ from 'lodash';
import ItemSelection from './component';
import { setGroundTruth } from '../groundTruth/actions';

import {
  getPredictionItems,
  getMaxTopPredictions,
  getAccuracyThreshold,
  getItemThreshold,
  getShowConfidenceScore,
  getItems,
} from '../../rootReducer';

const OTHER_FRUIT_LABEL = 'OtherFruit';
const NO_FRUIT_LABEL = 'NoFruit';
const BAG_COVER = 'BagCover';
const defaultStateToProps = {
  unknownItem: true,
  noPredictedItems: false,
  predictions: [],
};

const mapStateToProps = (state) => {
  let allPredictions = getPredictionItems(state)[0];
  if (_.isEmpty(allPredictions)) {
    return defaultStateToProps;
  }
  const maxTopPredictions = getMaxTopPredictions(state);

  let topTotalAUC = 0;

  const firstPredictionLabel = allPredictions?.[0]?.dataList[0];

  const unknownItem = firstPredictionLabel === OTHER_FRUIT_LABEL;
  const emptyScale = firstPredictionLabel === NO_FRUIT_LABEL;
  const bagCovers = firstPredictionLabel === BAG_COVER;

  const itemThreshold = getItemThreshold(state);
  allPredictions = allPredictions.filter((prediction) => {
    return (
      [OTHER_FRUIT_LABEL, NO_FRUIT_LABEL, BAG_COVER].indexOf(
        prediction.dataList[0]
      ) === -1 && itemThreshold < prediction.dataList[1]
    );
  });

  if (_.isEmpty(allPredictions)) {
    return defaultStateToProps;
  }

  const size = _.min([allPredictions.length, maxTopPredictions]);
  for (let i = 0; i < size; ++i) {
    topTotalAUC += Number.parseFloat(allPredictions[i].dataList[1]);
  }

  const allItems = getItems(state);
  return {
    predictions: allPredictions.slice(0, size).map(({ dataList: p }) => {
      const label = p[0];
      const accuracy = +p[1];
      return {
        label,
        accuracy,
        image: (allItems[label] && allItems[label].image) || '',
        textLabel: (allItems[label] && allItems[label].label) || '',
      };
    }),
    noPredictedItems: emptyScale || topTotalAUC < getAccuracyThreshold(state),
    showConfidenceScore: getShowConfidenceScore(state),
    unknownItem,
    bagCovers,
  };
};

const mapDispatchToProps = {
  selectItem: setGroundTruth,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);
