import React from 'react';
import { Container, Grid, CardMedia, Card, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import _ from "lodash";
import { useDataCollectorEffects } from './hooks';

const buttonStyle = { backgroundColor: '#2ca0f7', color: 'white', height: "55px", textTransform: 'none', fontFamily: 'Exo 2' }

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
}) => {
  useDataCollectorEffects(makePrediction, addItemsToReciept, createGroundTruthHasError, createGroundTruthIsLoading, gt, rawPredictions)
  return (
    <Container style={{marginTop: "50px"}} maxWidth="md">
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Autocomplete
            id="labels"
            onChange={(event, value) => setGroundTruth(value)}
            options={_.uniqBy(Object.values(items), 'label')}
            getOptionLabel={(option) => option.label || ''}
            style={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Ground Truth" variant="outlined"/>}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            style={buttonStyle}
            onClick={makePrediction}
          >
            Capture All (shift)
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            style={buttonStyle}
            disabled={createGroundTruthIsLoading || createGroundTruthHasError}
            onClick={() => addItemsToReciept(gt, rawPredictions)}
          >
            Save All (space)
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{marginTop: "30px"}} spacing={4} justify="space-around">
        {
          currentImages.map((currentImage, i) =>
            <Grid item xs={4} key={currentImage + i}>
              <Card>
                <CardMedia
                  src={`data:image/jpeg;base64,${currentImage}`}
                  style={{height: "300px"}}
                  component={"img"}
                />
              </Card>
            </Grid>
          )
        }
      </Grid>
    </Container>
  )
}
