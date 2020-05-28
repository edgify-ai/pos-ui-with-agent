import React from 'react';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import _ from "lodash"

export default ({
  currentImage, 
  items, 
  makePrediction, 
  setGroundTruth, 
  addItemToReciept, 
  gt, 
  rawPrediction,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
}) => (
  <Container style={{marginTop: "30px"}} maxWidth="md">
    <KeyboardEventHandler
    handleKeys={['space', 'shift']}
    onKeyEvent={(key, e) => {
      console.log(`capture keydown event of ${key}`)
      if (key === 'shift') {
        makePrediction()
      }else if (key ==='space') {
        addItemToReciept(gt, rawPrediction)
      }
    }} />
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card>
          <CardMedia
            // className={classes.cardMedia}
            src={`data:image/jpeg;base64,${currentImage}`}
            style={{height:"300px"}}
            component={"img"}
            title="Camera snapchot"
          />
        </Card>
      </Grid>
      <Grid 
        item xs={4}
        container
        direction="column"
        justify="space-around"
        alignItems="center">
        <Autocomplete
          id="labels"
          onChange={(event, value) => setGroundTruth(value)}
          options={_.uniqBy(Object.values(items), 'label')}
          getOptionLabel={(option) => option.label || ''}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
      </Grid>
      <Grid 
        item xs={4} 
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Button 
          variant="contained" 
          color="primary"
          disabled={createGroundTruthIsLoading || createGroundTruthHasError}
          onClick={() => addItemToReciept(gt, rawPrediction)}>
          Upload (space)
        </Button>
        <Button 
          variant="contained"
          onClick={makePrediction}>
            Take a new picture (shift)
        </Button>
      </Grid>
  </Grid> 
  </Container>

);
