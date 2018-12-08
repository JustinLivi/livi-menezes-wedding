import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { GoogleMap } from '../../Components/GoogleMap';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import directions from './directions.jpg';

const directionsUrl =
  'https://www.google.com/maps/dir//George+Peabody+Library,+17+E+Mt+Vernon+Pl,+Baltimore,+MD+21202/@39.2972644,-76.6500366,13z/data=!4m17!1m7!3m6!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2sGeorge+Peabody+Library!3b1!8m2!3d39.2972032!4d-76.6150171!4m8!1m0!1m5!1m1!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2m2!1d-76.6150171!2d39.2972032!3e3';

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
          clickable: true,
          place: {
            location: { lat: 39.2972032, lng: -76.6150171 },
            placeId: 'ChIJzYDBtZkEyIkR_5PpHaZnNR8'
          },
          position: { lat: 39.2972032, lng: -76.6150171 },
          title: 'George Peabody Library'
        }}
        url={directionsUrl}
      />
    </ProfileCard>
    <ButtonBar onlyInfo hideHelp external toDetails={directionsUrl} />
  </ColumnLayout>
);
