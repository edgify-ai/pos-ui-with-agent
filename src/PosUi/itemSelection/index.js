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
const getStateToProps = (params) => ({
  unknownItem: false,
  noPredictedItems: false,
  bagCovers: false,
  showConfidenceScore: false,
  predictions: [],
  ...params,
});

const mapStateToProps = (state) => {
  let allPredictions = getPredictionItems(state)[0];
  if (_.isEmpty(allPredictions)) {
    return getStateToProps({ unknownItem: true });
  }
  const maxTopPredictions = getMaxTopPredictions(state);
  const size = _.min([allPredictions.length, maxTopPredictions]);
  let topTotalAUC = 0;
  for (let i = 0; i < size; ++i) {
    topTotalAUC += Number.parseFloat(allPredictions[i].dataList[1]);
  }

  if (topTotalAUC < getAccuracyThreshold(state)) {
    return getStateToProps({ unknownItem: true });
  }

  const itemThreshold = getItemThreshold(state);
  const firstPredictionLabel = allPredictions?.[0]?.dataList[0];
  const firstPredictionScoreIsValid =
    itemThreshold < allPredictions?.[0]?.dataList[1];
  if (!firstPredictionScoreIsValid) {
    return getStateToProps({ unknownItem: true });
  }

  const unknownItem = firstPredictionLabel === OTHER_FRUIT_LABEL;
  const emptyScale = firstPredictionLabel === NO_FRUIT_LABEL;
  const bagCovers = firstPredictionLabel === BAG_COVER;

  if (unknownItem || emptyScale || bagCovers) {
    return getStateToProps({
      unknownItem,
      bagCovers,
      noPredictedItems: emptyScale,
    });
  }

  allPredictions = allPredictions.filter(
    (prediction) =>
      ![OTHER_FRUIT_LABEL, NO_FRUIT_LABEL, BAG_COVER].includes(
        prediction.dataList[0]
      )
  );

  const allItems = getItems(state);

  const predictions = allPredictions
    .slice(0, size)
    .map(({ dataList: p }) => {
      const label = p[0];
      const accuracy = +p[1];
      return {
        label,
        accuracy,
        image: (allItems[label] && allItems[label].image) || '',
        textLabel: (allItems[label] && allItems[label].label) || '',
      };
    })
    .filter(({ accuracy }) => itemThreshold < accuracy);

  return getStateToProps({
    showConfidenceScore: getShowConfidenceScore(state),
    predictions,
  });
};

const mapDispatchToProps = {
  selectItem: setGroundTruth,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);
