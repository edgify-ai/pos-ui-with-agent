import React from 'react';
import { Container, Grid, CardMedia, Card, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import _ from "lodash"

export default ({
  currentImages,
  items, 
  makePrediction, 
  setGroundTruth, 
  addItemsToReciept,
  gt, 
  rawPredictions,
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
        addItemsToReciept(gt, rawPredictions)
      }
    }} />
    <Grid container spacing={3}>
      {
        currentImages.map(currentImage =>
            <Grid item xs={4} key={currentImage}>
              <Card>
                <CardMedia
                    src={`data:image/jpeg;base64,${currentImage}`}
                    style={{height:"300px"}}
                    component={"img"}
                    title="Camera snapchot"
                />
              </Card>
            </Grid>
        )
      }
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
          onClick={() => addItemsToReciept(gt, rawPredictions)}>
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
