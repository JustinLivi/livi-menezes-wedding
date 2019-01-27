import { Typography } from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import celebrate from './Celebrate.jpg';

export const RsvpComplete: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={celebrate}
      title='RSVP Complete!'
      blurb={
        <React.Fragment>
          <Typography component='p'>
            Thanks for taking the time to respond!
          </Typography>
          <Typography component='p'>
            Continue below to test your knowledge of our story.
          </Typography>
        </React.Fragment>
      }
    />
    <ContinueBar back='/rsvp/review' next='/our-story' />
  </ColumnLayout>
);
