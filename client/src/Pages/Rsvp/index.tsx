import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { MainLayout } from '../../Layouts/MainLayout';
import { ProfileCard } from '../../ProfileCard';
import justinMarisa from '../../profiles/justin-marisa.jpg';

export const Rsvp: React.SFC = () => (
  <MainLayout>
    <ProfileCard image={justinMarisa} title="Justin and Marisa's Wedding" />
    <ButtonBar />
  </MainLayout>
);
