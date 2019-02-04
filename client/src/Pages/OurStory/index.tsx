import { Typography } from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import temescalSun from './temescal-sun.jpg';

export const OurStory: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={temescalSun}
      title='Our Story'
      blurb={
        <div>
          <Typography>Test your knowledge of our relationship!</Typography>
          <Typography>
            Pay close attention - there are lots of trick questions and you'll
            be graded!
          </Typography>
        </div>
      }
    />
    <ContinueBar back={'/rsvp/complete'} next={'/our-story/question/0'} />
  </ColumnLayout>
);
