import React from 'react';
import { Container } from '@material-ui/core';
import ActionsPanel from './components/ActionsPanel';
import Cameras from './components/Cameras';
import useDataCollectorEffects from './hooks';

type Props = {
  items: any[];
  makePrediction: (...args: any[]) => any;
  setGroundTruth: (...args: any[]) => any;
  addItemsToReciept: (...args: any[]) => any;
  gt: Object;
  predictions: any[];
  createGroundTruthHasError: boolean;
  createGroundTruthIsLoading: boolean;
};

const DataCollector: React.FC<Props> = ({
  items,
  makePrediction,
  setGroundTruth,
  addItemsToReciept,
  gt,
  predictions,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
}) => {
  useDataCollectorEffects(
    makePrediction,
    addItemsToReciept,
    createGroundTruthHasError,
    createGroundTruthIsLoading,
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
        createGroundTruthHasError={createGroundTruthHasError}
        createGroundTruthIsLoading={createGroundTruthIsLoading}
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
