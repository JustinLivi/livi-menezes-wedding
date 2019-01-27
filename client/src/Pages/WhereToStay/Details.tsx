import * as React from 'react';

import { StandardCard } from '../../Components/StandardCard';
import { GridLayout } from '../../Layouts/GridLayout';

const directionsUrl =
  'https://www.google.com/maps/dir//George+Peabody+Library,+17+E+Mt+Vernon+Pl,+Baltimore,+MD+21202/@39.2972644,-76.6500366,13z/data=!4m17!1m7!3m6!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2sGeorge+Peabody+Library!3b1!8m2!3d39.2972032!4d-76.6150171!4m8!1m0!1m5!1m1!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2m2!1d-76.6150171!2d39.2972032!3e3';

export const WhereToStayDetails: React.SFC = () => (
  <GridLayout>
    <StandardCard>
      <p>Hotel Blocks</p>
      <p />
      <p>
        <a href='https://www.jdvhotels.com/hotels/maryland/baltimore/hotel-revival-baltimore'>
          Hotel Revival
        </a>
        <p>
          {' '}
          Call (407) 745-3477. We are under the “Livi Menezes Wedding Block.”
        </p>
        <p />
        <p>
          <a href='https://www.monaco-baltimore.com/'>Hotel Monaco</a>
        </p>
        <p>
          Call 1.888.752.2636. We are under the “Livi Menezes Wedding Block” or
          use code AP8.
        </p>
        <p />
        <p>
          <a href='https://www.redlion.com/hotel-rl/md/baltimore/hotel-rl-baltimore-inner-harbor'>
            Hotel RL
          </a>
        </p>
        <p>
          1. Click{' '}
          <a href='https://www.redlion.com/hotel-rl/md/baltimore/hotel-rl-baltimore-inner-harbor#room-types'>
            here
          </a>
        </p>
        <p>
          2. Select the Check-In and Check-Out dates at the top of the page.
        </p>
        <p>
          3. Select the Discounts drop-down menu and enter the group code
          MENE1011 to verify.
        </p>
        <p>4. Group rates will display at the bottom of the screen.</p>
        <p />
        <p>
          <a href='https://www.airbnb.com/s/Baltimore--MD--United-States/homes?refinement_paths%5B%5D=%2Fhomes&query=Baltimore%2C%20MD%2C%20United%20States&place_id=ChIJt4P01q4DyIkRWOcjQqiWSAQ&allow_override%5B%5D=&s_tag=oQMKVGGn'>
            AirBnB
          </a>
        </p>
        <p>
          If you have any questions about where to stay in Baltimore, feel free
          to reach out! We are happy to provide suggestions/advice!
        </p>
      </p>
    </StandardCard>
  </GridLayout>
);
