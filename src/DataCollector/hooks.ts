import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';
import {
  createGroundTruthHasError,
  createGroundTruthIsLoading,
  getGroundTruth,
  getItems,
  getPredictions,
} from '../rootReducer';
import * as GroundTruthActions from '../PosUi/groundTruth/actions';
import * as ConfirmationScreen from '../PosUi/confirmationScreen/actions';
import * as PredictionActions from '../PosUi/prediction/actions';

export default () => {
  const items = useSelector(getItems);
  const gt = useSelector(getGroundTruth);
  const predictions = useSelector(getPredictions);
  const groundTruthHasError = useSelector(createGroundTruthHasError);
  const groundTruthIsLoading = useSelector(createGroundTruthIsLoading);
  const prevGroundTruthIsLoading = useRef(false);

  const dispatch = useDispatch();
  const setGroundTruth = useCallback(
    (groundTruth) => dispatch(GroundTruthActions.setGroundTruth(groundTruth)),
    [dispatch]
  );
  const makePrediction = useCallback(
    (port?: number) => {
      dispatch(ConfirmationScreen.restoreDefault());
      dispatch(PredictionActions.makePredictions(port));
    },
    [dispatch]
  );
  const addItemsToReciept = useCallback(
    (groundTruth, rawPrediction) => {
      if (_.isEmpty(groundTruth)) {
        alert('Please select a label');
        return;
      }
      dispatch(
        ConfirmationScreen.addItemsToReciept(
          groundTruth.real_label,
          rawPrediction,
          false
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    makePrediction();
  }, [makePrediction]);

  useEffect(() => {
    if (groundTruthHasError) {
      toastr.error(
        'Failed to store ground truth.',
        'Probably you use this snapshot already. Or check if agent is running'
      );
    }
    if (
      !groundTruthIsLoading &&
      prevGroundTruthIsLoading.current &&
      !groundTruthHasError
    ) {
      toastr.success('Sample stored', '');
    }
    prevGroundTruthIsLoading.current = groundTruthIsLoading;
  }, [groundTruthHasError, groundTruthIsLoading]);

  useEffect(() => {
    const onKeyDown = ({ keyCode }: KeyboardEvent) => {
      switch (keyCode) {
        case 16:
          makePrediction();
          break;
        case 32:
          addItemsToReciept(gt, predictions);
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [makePrediction, addItemsToReciept, gt, predictions]);

  return {
    items,
    makePrediction,
    addItemsToReciept,
    groundTruthHasError,
    groundTruthIsLoading,
    gt,
    predictions,
    setGroundTruth,
  };
};
