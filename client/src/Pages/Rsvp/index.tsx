import { Typography } from '@material-ui/core';
import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';

export const Rsvp: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={justinMarisa}
      title="Justin and Marisa's Wedding"
      blurb={
        <React.Fragment>
          <Typography component='p'>Sunday, October 13, 2019 at 4pm</Typography>
          <Typography component='p'>Baltimore, MD</Typography>
        </React.Fragment>
      }
    />
    <ButtonBar toDetails='/details' />
  </ColumnLayout>
);
