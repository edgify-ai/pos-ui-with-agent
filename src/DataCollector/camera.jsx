import React from 'react';
import { Grid, Card, CardMedia, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: { height: 300 },
  media: { height: '80%', width: '96%', margin: 'auto', marginTop: '2%' },
  uuid: { margin: 10 },
  button: {
    backgroundColor: '#2ca0f7',
    color: 'white',
    textTransform: 'none',
    fontFamily: 'Exo 2',
  },
});

export default ({ image, uuid, port, host, captureImage, onSave }) => {
  const classes = useStyles();
  return (
    <Grid item xs={4} border={1}>
      <Card className={classes.card}>
        <CardMedia
          image={`data:image/jpeg;base64,${image}`}
          className={classes.media}
        />
        <CardActions>
          <Grid container justify="space-around" alignItems="center">
            <Grid>
              <Grid>{host}</Grid>
              <Grid container justify="center">
                {port}
              </Grid>
            </Grid>
            <Button
              className={classes.button}
              variant="contained"
              disableElevation
              onClick={captureImage}
            >
              Capture
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              disableElevation
              onClick={onSave}
            >
              Save
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Grid className={classes.uuid}>{uuid}</Grid>
    </Grid>
  );
};
