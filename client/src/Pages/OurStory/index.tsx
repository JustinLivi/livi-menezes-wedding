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
      blurb='Test your knowledge of our relationship!'
    />
    <ContinueBar back={'/rsvp/complete'} next={'/our-story/question/0'} />
  </ColumnLayout>
);
