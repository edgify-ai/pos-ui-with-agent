import React from 'react';
import { Container } from '@material-ui/core';
import ActionsPanel from './components/ActionsPanel';
import Cameras from './components/Cameras';
import useDataCollectorEffects from './hooks';

const DataCollector: React.FC = () => {
  const {
    items,
    makePrediction,
    addItemsToReciept,
    groundTruthHasError,
    groundTruthIsLoading,
    gt,
    predictions,
    setGroundTruth,
  } = useDataCollectorEffects();
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
