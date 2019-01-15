import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { RsvpCard } from './RsvpCard';

export const Rsvp: React.SFC = () => (
  <ColumnLayout>
    <RsvpCard />
    <ButtonBar toDetails='/details' />
  </ColumnLayout>
);
