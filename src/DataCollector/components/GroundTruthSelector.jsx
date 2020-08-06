import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';

const GroundTruthSelector = ({ gt, setGroundTruth, items, index }) => {
  return (
    <Grid
      container
      spacing={2}
      justify="flex-start"
      alignItems="center"
      style={{ minHeight: 90 }}
    >
      <Grid item style={{ padding: 0 }}>
        <img
          src={gt?.image}
          alt={gt?.label}
          style={{ minWidth: 80, width: 80 }}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          id={`labels-${index}`}
          onChange={(event, value) => setGroundTruth(value, index)}
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
    </Grid>
  );
};

export default GroundTruthSelector;
