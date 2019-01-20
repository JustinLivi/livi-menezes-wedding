import { CircularProgress, Grid } from '@material-ui/core';
import * as React from 'react';

export const Loading: React.SFC = () => (
  <Grid container direction='column' justify='center' alignItems='center'>
    <CircularProgress color='secondary' />
  </Grid>
);
