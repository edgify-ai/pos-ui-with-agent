import {combineReducers} from 'redux';

import CategoriesReducer, * as Categories from './PosUi/categories/reducer';
import WeightReducer, * as Weight from './PosUi/weight/reducer';
import PredictionReducer, * as Prediction from './PosUi/prediction/reducer';
import GroundTruthReducer, * as GroundTruth from './PosUi/groundTruth/reducer';
import ItemsByCategoryReducer, * as ItemsByCategory
  from './PosUi/itemsByCategory/reducer';
import ConfigReducer, * as Config from './PosUi/config/reducer';
import CreateGroundTruthReducer, * as CreateGroundTruth from "./PosUi/confirmationScreen/reducer"
import {reducer as toastrReducer} from 'react-redux-toastr'


export default combineReducers ({
  categories: CategoriesReducer,
  weight: WeightReducer,
  prediction: PredictionReducer,
  groundTruth: GroundTruthReducer,
  createGroundTruth: CreateGroundTruthReducer,
  itemsByCategory: ItemsByCategoryReducer,
  config: ConfigReducer,
  toastr: toastrReducer
});

// SELECTORS

export const getCategories = ({categories}) =>
  Categories.getCategories (categories);

export const getWeight = ({weight}) => Weight.getWeight (weight);

export const getPrediction = ({prediction}) =>
  Prediction.getPrediction (prediction);

export const getPredictionResponse = ({prediction}) =>
  Prediction.getOriginalResponse (prediction);
export const getPredictionImage = ({prediction}) =>
  Prediction.getCurrentImage (prediction);
export const getPredictionItems = ({prediction}) =>
  Prediction.getPredictionItems (prediction);

export const getGroundTruth = ({groundTruth}) =>
  GroundTruth.getGroudTruth (groundTruth);

export const getItemsByCategory = ({itemsByCategory}) =>
  ItemsByCategory.getItemsByCategory (itemsByCategory);
export const getItems = (state) => ItemsByCategory.getItems(state)

export const getMaxTopPredictions = ({config}) =>
  Config.getMaxTopPredictions (config);
export const getAccuracyThreshold = ({config}) =>
  Config.getAccuracyThreshold (config);

export const createGroundTruthIsLoading = ({createGroundTruth}) => CreateGroundTruth.isLoading(createGroundTruth)
export const createGroundTruthHasError = ({createGroundTruth}) => CreateGroundTruth.hasError(createGroundTruth)
