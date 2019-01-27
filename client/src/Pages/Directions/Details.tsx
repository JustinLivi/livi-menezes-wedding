import * as React from 'react';

import { GoogleMap } from '../../Components/GoogleMap';
import { ProfileCard } from '../../Components/ProfileCard';
import { StandardCard } from '../../Components/StandardCard';
import { WikiCard } from '../../Components/WikiCard';
import { GridLayout } from '../../Layouts/GridLayout';
import directions from './directions.jpg';

const directionsUrl =
  'https://www.google.com/maps/dir//George+Peabody+Library,+17+E+Mt+Vernon+Pl,+Baltimore,+MD+21202/@39.2972644,-76.6500366,13z/data=!4m17!1m7!3m6!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2sGeorge+Peabody+Library!3b1!8m2!3d39.2972032!4d-76.6150171!4m8!1m0!1m5!1m1!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2m2!1d-76.6150171!2d39.2972032!3e3';

export const DirectionsDetails: React.SFC = () => (
  <GridLayout>
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
    <StandardCard>
      <p>Flying: BWI is the nearest Airport insert link >></p>
      <p>
        Driving: We will be providing valet parking at the Library. The parking
        garage closes at midnight.
      </p>
      <p>
        Train: The Library is within walking distance of the Library. However,
        the last MARC train departs Baltimore at 6pm. insert MARC train schedule
        link>>
      </p>
    </StandardCard>
    <WikiCard section={0} page='George_Peabody_Library' />
  </GridLayout>
);
