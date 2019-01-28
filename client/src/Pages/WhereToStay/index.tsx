import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import innerHarbor from './inner-harbor.jpg';

export const WhereToStay: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={innerHarbor}
      title='Where to Stay'
      blurb='Find a hotel or AirBnb in Baltimore, MD'
    />
    <ContinueBar back='/directions/details' next='/where-to-stay/details' />
  </ColumnLayout>
);
