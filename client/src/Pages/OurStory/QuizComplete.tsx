import { Typography } from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import celebrate from './Celebrate.jpg';
import { questions } from './Details';

export const QuizComplete: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={celebrate}
      title='Quiz Complete!'
      blurb={
        <React.Fragment>
          <Typography component='p'>You did great!</Typography>
          <Typography component='p'>
            Continue below to get travel information.
          </Typography>
        </React.Fragment>
      }
    />
    <ContinueBar
      back={`/our-story/answer/${questions.length - 1}`}
      next='/directions'
    />
  </ColumnLayout>
);
