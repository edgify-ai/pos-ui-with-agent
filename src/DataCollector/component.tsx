import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import ActionsPanel from './components/ActionsPanel';
import Cameras from './components/Cameras';
import useDataCollectorEffects from './hooks';
import {
  getItems,
  getGroundTruth,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
  getPredictions,
} from '../rootReducer';

type Props = {
  makePrediction: (...args: any[]) => any;
  setGroundTruth: (...args: any[]) => any;
  addItemsToReciept: (...args: any[]) => any;
};

const DataCollector: React.FC<Props> = ({
  makePrediction,
  setGroundTruth,
  addItemsToReciept,
}) => {
  const items = useSelector(getItems);
  const gt = useSelector(getGroundTruth);
  const predictions = useSelector(getPredictions);
  const groundTruthHasError = useSelector(createGroundTruthHasError);
  const groundTruthIsLoading = useSelector(createGroundTruthIsLoading);
  useDataCollectorEffects(
    makePrediction,
    addItemsToReciept,
    groundTruthHasError,
    groundTruthIsLoading,
    gt,
    predictions
  );
  return (
    <Container style={{ marginTop: '50px' }} maxWidth="md">
      <ActionsPanel
        items={items}
        predictions={predictions}
        makePrediction={makePrediction}
        setGroundTruth={setGroundTruth}
        addItemsToReciept={addItemsToReciept}
        gt={gt}
        groundTruthHasError={groundTruthHasError}
        groundTruthIsLoading={groundTruthIsLoading}
      />
      <Cameras
        predictions={predictions}
        makePrediction={makePrediction}
        addItemsToReciept={addItemsToReciept}
        gt={gt}
      />
    </Container>
  );
};

export default DataCollector;
