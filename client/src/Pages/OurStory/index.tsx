import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import temescalSun from './temescal-sun.jpg';

export const OurStory: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={temescalSun}
      title='Our Story'
      blurb='Test your knowledge of our relationship with this fun quiz!'
    />
    <ButtonBar onlyInfo hideHelp toDetails='/our-story/details' />
  </ColumnLayout>
);