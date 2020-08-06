import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroundTruthSelector from './GroundTruthSelector';

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
  multiLabel,
}) => {
  const classes = useStyles();

  const onCaptureAll = (event) => {
    event.preventDefault();
    makePrediction();
  };

  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center">
      <Grid item>
        {Array(multiLabel)
          .fill(0)
          .map((_, i) => (
            <GroundTruthSelector
              key={`gt-selector-${i}`} // eslint-disable-line react/no-array-index-key
              gt={gt[i]}
              setGroundTruth={setGroundTruth}
              items={items}
              index={i}
            />
          ))}
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
