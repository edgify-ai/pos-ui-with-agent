import React from 'react';
import { Grid } from '@material-ui/core';
import Camera from './Camera';

const Cameras = ({ predictions, makePrediction, addItemsToReciept, gt }) => {
  return (
    <Grid
      container
      style={{ marginTop: '30px' }}
      spacing={4}
      justify="space-around"
    >
      {predictions.map(({ json, config, raw }) => {
        const { port, host } = config;
        const image = json?.image.image;
        const uuid = json?.image.uuid;
        const captureImage = () => makePrediction(config);
        const onSave = () => addItemsToReciept(gt, [{ raw, config }]);
        return (
          <Camera
            key={port + host}
            image={image}
            uuid={uuid}
            host={host}
            port={port}
            captureImage={captureImage}
            onSave={onSave}
          />
        );
      })}
    </Grid>
  );
};

export default React.memo(Cameras);
