import { Typography } from '@material-ui/core';
import * as React from 'react';

export const ErrorMessage: React.SFC = () => (
  <React.Fragment>
    <Typography color='secondary' component='p'>
      Encountered error logging in.
    </Typography>
    <Typography color='secondary' component='p'>
      Please try clicking the link from your invitation email.
    </Typography>
  </React.Fragment>
);
