import React from 'react';
import { Container } from '@material-ui/core';
import ActionsPanel from './components/ActionsPanel';
import Cameras from './components/Cameras';
import useDataCollectorEffects from './hooks';

const DataCollector = ({
  items,
  makePrediction,
  setGroundTruth,
  addItemsToReciept,
  gt,
  predictions,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
}) => {
  const { count, setCount } = useDataCollectorEffects(
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
        groundTruthHasError={createGroundTruthHasError}
        groundTruthIsLoading={createGroundTruthIsLoading}
        count={count}
        setCount={setCount}
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
