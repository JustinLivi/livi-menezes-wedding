import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import peabody from './george-peabody-library.jpg';

export const Venue: React.SFC = () => (
  <MainLayout>
    <ProfileCard
      image={peabody}
      title='Venue'
      blurb='The spectacular George Peabody Library'
    />
    <ButtonBar onlyInfo hideHelp />
  </MainLayout>
);
