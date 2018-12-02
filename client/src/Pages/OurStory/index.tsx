import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import temescalSun from './temescal-sun.jpg';

export const OurStory: React.SFC = () => (
  <MainLayout>
    <ProfileCard
      image={temescalSun}
      title='Our Story'
      blurb='Can you guess what online dating app we met on?'
    />
    <ButtonBar onlyInfo hideHelp />
  </MainLayout>
);
