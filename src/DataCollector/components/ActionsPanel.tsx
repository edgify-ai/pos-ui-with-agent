import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  items: object;
  predictions: any[];
  makePrediction: (...args: any[]) => any;
  setGroundTruth: (...args: any[]) => any;
  addItemsToReciept: (...args: any[]) => any;
  gt: Record<string, any>;
  groundTruthHasError: boolean;
  groundTruthIsLoading: boolean;
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

const ActionsPanel: React.FC<Props> = ({
  items,
  predictions,
  makePrediction,
  setGroundTruth,
  addItemsToReciept,
  gt,
  groundTruthHasError,
  groundTruthIsLoading,
}) => {
  const classes = useStyles();

  const onCaptureAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    makePrediction();
  };

  return (
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
          disabled={groundTruthIsLoading || groundTruthHasError}
          onClick={() => addItemsToReciept(gt, predictions)}
        >
          Save All (space)
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionsPanel;
