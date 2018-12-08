import { Grid } from '@material-ui/core';
import * as React from 'react';

import { VirtualTourCard } from '../../Components/VirtualTourCard';
import { WikiCard } from '../../Components/WikiCard';

export const VenueDetails: React.SFC = () => (
  <Grid container spacing={24}>
    <Grid item xs={12} sm={6}>
      <VirtualTourCard />
    </Grid>
    <Grid item xs={12} sm={6}>
      <WikiCard section={0} page='George_Peabody_Library' />
    </Grid>
    <Grid item xs={12}>
      <WikiCard section={1} page='George_Peabody_Library' />
    </Grid>
    <Grid item xs={12}>
      <WikiCard section={2} page='George_Peabody_Library' />
    </Grid>
  </Grid>
);
