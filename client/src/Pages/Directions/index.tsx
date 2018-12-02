import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import directions from './directions.jpg';

export const Directions: React.SFC = () => (
  <MainLayout>
    <ProfileCard
      image={directions}
      title='Directions'
      blurb='Get directions to the Peabody Library'
    />
    <ButtonBar onlyInfo hideHelp />
  </MainLayout>
);
