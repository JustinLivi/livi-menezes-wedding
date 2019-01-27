import * as React from 'react';

import { NextBar } from '../../ButtonBar/NextBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import peabody from './george-peabody-library.jpg';

export const Venue: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={peabody}
      title='Venue'
      blurb='Learn about the George Peabody Library'
    />
    <NextBar to='venue/details' />
  </ColumnLayout>
);
