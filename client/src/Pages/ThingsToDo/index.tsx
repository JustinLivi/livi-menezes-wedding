import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import nationalAquarium from './national-aquarium.jpg';

export const ThingsToDo: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={nationalAquarium}
      title='Things to Do'
      blurb='Activities to pass the time in Baltimore and DC'
    />
    <ButtonBar onlyInfo hideHelp toDetails='/things-to-do/details' />
  </ColumnLayout>
);
