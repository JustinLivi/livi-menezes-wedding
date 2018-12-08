import { Grid } from '@material-ui/core';
import * as React from 'react';

import { VirtualTourCard } from '../../Components/VirtualTourCard';
import { WikiCard } from '../../Components/WikiCard';
import { GridLayout } from '../../Layouts/GridLayout';

export const VenueDetails: React.SFC = () => (
  <GridLayout>
    <Grid item xs={12} sm={6} xl={3}>
      <VirtualTourCard />
    </Grid>
    <Grid item xs={12} sm={6} xl={3}>
      <WikiCard section={0} page='George_Peabody_Library' />
    </Grid>
    <Grid item xs={12} lg={6}>
      <WikiCard section={1} page='George_Peabody_Library' />
    </Grid>
    <Grid item xs={12} lg={6}>
      <WikiCard section={2} page='George_Peabody_Library' />
    </Grid>
  </GridLayout>
);
