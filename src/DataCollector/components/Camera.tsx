import React from 'react';
import { Grid, Card, CardMedia, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  image: string;
  port: number;
  captureImage: (...args: any[]) => any;
  onSave: (...args: any[]) => any;
};

const useStyles = makeStyles({
  card: { height: 300, width: 280 },
  media: { height: '80%', width: '96%', margin: 'auto', marginTop: '2%' },
  button: {
    backgroundColor: '#2ca0f7',
    color: 'white',
    textTransform: 'none',
    fontFamily: 'Exo 2',
  },
});

const Camera: React.FC<Props> = ({ image, port, captureImage, onSave }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          image={`data:image/jpeg;base64,${image}`}
          className={classes.media}
        />
        <CardActions>
          <Grid container justify="space-around" alignItems="center">
            {`Port ${port}`}
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
    </Grid>
  );
};

export default Camera;
