import React from 'react';
import { Container, Grid, CardMedia, Card, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import _ from "lodash"

const buttonStyle = { backgroundColor: '#2ca0f7', color: 'white', height: "55px", textTransform: 'none' }

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
  <Container style={{marginTop: "50px"}} maxWidth="md">
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
    <Grid container spacing={4} justify="center">
      <Grid item>
        <Autocomplete
            id="labels"
            onChange={(event, value) => setGroundTruth(value)}
            options={_.uniqBy(Object.values(items), 'label')}
            getOptionLabel={(option) => option.label || ''}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
      </Grid>
      <Grid item>
        <Button
            variant="contained"
            disableElevation
            style={buttonStyle}
            onClick={makePrediction}>
          Capture All (shift)
        </Button>
      </Grid>
      <Grid item>
        <Button
            variant="contained"
            disableElevation
            style={buttonStyle}
            disabled={createGroundTruthIsLoading || createGroundTruthHasError}
            onClick={() => addItemsToReciept(gt, rawPredictions)}>
          Save All (space)
        </Button>
      </Grid>
    </Grid>
    <Grid container style={{marginTop: "30px"}} spacing={4} justify="space-around">
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
    </Grid>
  </Container>
);
