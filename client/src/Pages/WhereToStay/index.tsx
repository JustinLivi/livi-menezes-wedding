import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import innerHarbor from './inner-harbor.jpg';

export const WhereToStay: React.SFC = () => (
  <MainLayout>
    <ProfileCard
      image={innerHarbor}
      title='Where to Stay'
      blurb='Find a hotel or AirBnb in Baltimore, MD'
    />
    <ButtonBar onlyInfo hideHelp />
  </MainLayout>
);
