import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import nationalAquarium from './national-aquarium.jpg';

export const ThingsToDo: React.SFC = () => (
  <MainLayout>
    <ProfileCard
      image={nationalAquarium}
      title='Things to Do'
      blurb='Activities to pass the time in Baltimore and DC'
    />
    <ButtonBar onlyInfo hideHelp />
  </MainLayout>
);
