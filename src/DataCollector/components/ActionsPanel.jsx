import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#2ca0f7',
    color: 'white',
    height: '55px',
    textTransform: 'none',
    fontFamily: 'Exo 2',
  },
  counterContainer: {
    marginLeft: '50px',
  },
  resetButton: {
    textTransform: 'none',
  },
  counter: {
    fontSize: '60px',
  },
});

const ActionsPanel = ({
  items,
  predictions,
  makePrediction,
  setGroundTruth,
  addItemsToReciept,
  gt,
  groundTruthHasError,
  groundTruthIsLoading,
  count,
  setCount,
}) => {
  const classes = useStyles();

  const onCaptureAll = (event) => {
    event.preventDefault();
    makePrediction();
  };

  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center">
      <Grid item>
        <img
          src={gt?.image}
          alt={gt?.label}
          style={{ minWidth: 80, width: 80 }}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          id="labels"
          onChange={(event, value) => setGroundTruth(value)}
          options={_.uniqBy(
            Object.values(items).sort((a, b) => a.label.localeCompare(b.label)),
            'label'
          )}
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
      <Grid item className={classes.counterContainer}>
        <Grid container direction="column" alignItems="center">
          <Grid className={classes.counter}>{count}</Grid>
          <Button
            color="primary"
            className={classes.resetButton}
            disableElevation
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(ActionsPanel);
