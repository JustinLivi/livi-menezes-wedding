import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
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
    <ContinueBar back='/registry' next='/things-to-do/details' />
  </ColumnLayout>
);
