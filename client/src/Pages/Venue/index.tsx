import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
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
    <ButtonBar onlyInfo hideHelp toDetails='venue/details' />
  </ColumnLayout>
);
