import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { GoogleMap } from '../../Components/GoogleMap';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import directions from './directions.jpg';

export const Directions: React.SFC = () => (
  <ColumnLayout>
    <ProfileCard
      image={directions}
      title='Directions'
      blurb='Get directions to the Peabody Library'
    >
      <GoogleMap
        id='peabody-map'
        options={{
          center: { lat: 39.2972032, lng: -76.6150171 },
          zoom: 15
        }}
        marker={{
          position: { lat: 39.2972032, lng: -76.6150171 }
        }}
      />
    </ProfileCard>
    <ButtonBar onlyInfo hideHelp toDetails='/directions/details' />
  </ColumnLayout>
);
