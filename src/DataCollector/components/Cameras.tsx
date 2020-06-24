import React from 'react';
import { Grid } from '@material-ui/core';
import Camera from './Camera';

type Props = {
  predictions: any[];
  makePrediction: (...args: any[]) => any;
  addItemsToReciept: (...args: any[]) => any;
  gt: Object;
};

const Cameras: React.FC<Props> = ({
  predictions,
  makePrediction,
  addItemsToReciept,
}) => {
  return (
    <Grid
      container
      style={{ marginTop: '30px' }}
      spacing={4}
      justify="space-around"
    >
      {predictions.map(({ json, port, raw, gt }) => {
        const image = json?.image.image;
        const captureImage = () => makePrediction(port);
        const onSave = () => addItemsToReciept(gt, [{ raw, port }]);
        return (
          <Camera
            key={image + port}
            image={image}
            port={port}
            captureImage={captureImage}
            onSave={onSave}
          />
        );
      })}
    </Grid>
  );
};

export default Cameras;
