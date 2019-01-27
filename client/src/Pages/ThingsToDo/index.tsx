import * as React from 'react';

import { NextBar } from '../../ButtonBar/NextBar';
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
    <NextBar to='/things-to-do/details' />
  </ColumnLayout>
);
