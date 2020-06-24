import React from 'react';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
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

const useStyles = makeStyles({
  button: {
    backgroundColor: '#2ca0f7',
    color: 'white',
    height: '55px',
    textTransform: 'none',
    fontFamily: 'Exo 2',
  },
});

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
  const classes = useStyles();
  useDataCollectorEffects(
    makePrediction,
    addItemsToReciept,
    createGroundTruthHasError,
    createGroundTruthIsLoading,
    gt,
    predictions
  );
  const onCaptureAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    makePrediction();
  };
  return (
    <Container style={{ marginTop: '50px' }} maxWidth="md">
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Autocomplete
            id="labels"
            onChange={(event, value) => setGroundTruth(value)}
            options={_.uniqBy(Object.values(items), 'label')}
            getOptionLabel={(option) => option.label || ''}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Ground Truth" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            className={classes.button}
            onClick={onCaptureAll}
          >
            Capture All (shift)
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            className={classes.button}
            disabled={createGroundTruthIsLoading || createGroundTruthHasError}
            onClick={() => addItemsToReciept(gt, predictions)}
          >
            Save All (space)
          </Button>
        </Grid>
      </Grid>
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
