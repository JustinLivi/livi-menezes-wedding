import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';

export const Rsvp: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard image={justinMarisa} title="Justin and Marisa's Wedding" />
    <ButtonBar toDetails='/details' />
  </ColumnLayout>
);
