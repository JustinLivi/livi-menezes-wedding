import * as React from 'react';

import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
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
    <RsvpBar
      onlyInfo
      hideHelp
      toDetails='/our-story/question/0'
      detailsIconType={DetailsIcons.nextArrow}
    />
  </ColumnLayout>
);
