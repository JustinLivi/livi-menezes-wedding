import { CardContent, Link, Typography } from '@material-ui/core';
import { DirectionsCar, DirectionsTransit, Flight } from '@material-ui/icons';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

const directionsUrl =
  'https://www.google.com/maps/dir//George+Peabody+Library,+17+E+Mt+Vernon+Pl,+Baltimore,+MD+21202/@39.2972644,-76.6500366,13z/data=!4m17!1m7!3m6!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2sGeorge+Peabody+Library!3b1!8m2!3d39.2972032!4d-76.6150171!4m8!1m0!1m5!1m1!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2m2!1d-76.6150171!2d39.2972032!3e3';

export const DirectionsDetails: React.SFC = () => (
  <ColumnLayout>
    <StandardCard>
      <CardContent>
        <Typography variant='h4' component='h1'>
          Transit
        </Typography>
        <hr />
        <Typography variant='h6' component='h2'>
          <Flight />
          &nbsp; Flying
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          <Link target='_blank' href='https://www.bwiairport.com/'>
            BWI
          </Link>
          &nbsp; is the nearest Airport with numerous &nbsp;
          <Link
            target='_blank'
            href='https://www.bwiairport.com/to-from-bwi/transportation'
          >
            transit options
          </Link>
          .&nbsp;
          <Link
            target='_blank'
            href='https://www.flydulles.com/iad/dulles-international-airport'
          >
            Dulles
          </Link>
          &nbsp;and&nbsp;
          <Link
            target='_blank'
            href='https://www.flyreagan.com/dca/reagan-national-airport'
          >
            Reagan
          </Link>
          &nbsp;are other, farther options.
        </Typography>

        <Typography variant='h6' component='h2'>
          <DirectionsCar />
          &nbsp; Driving
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          <Link target='_blank' href={directionsUrl}>
            The Peabody Library
          </Link>
          &nbsp; is easily accessible in Baltimore via ride shares, such
          as&nbsp;
          <Link target='_blank' href='https://www.lyft.com/invite/LIVIMENEZES'>
            Lyft
          </Link>
          &nbsp; and&nbsp;
          <Link target='_blank' href='https://www.uber.com/invite/justinl1222'>
            Uber
          </Link>
          . The <strong>valet closes at midnight</strong>, so plan to pick up
          your car before then.
        </Typography>

        <Typography variant='h6' component='h2'>
          <DirectionsTransit />
          &nbsp;Train
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          <Link target='_blank' href='https://www.amtrak.com/stations/bal'>
            Penn Station
          </Link>
          &nbsp; is within &nbsp;
          <Link
            target='_blank'
            href='https://www.google.com/maps/dir/Pennsylvania+Station,+1500+N+Charles+St,+Baltimore,+MD+21201/George+Peabody+Library,+East+Mount+Vernon+Place,+Baltimore,+MD/@39.3023203,-76.6195313,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x89c804953dff313b:0x579d11bb8a2e7410!2m2!1d-76.6156702!2d39.307421!1m5!1m1!1s0x89c80499b5c180cd:0x1f3567a61de993ff!2m2!1d-76.6150171!2d39.2972032!3e2'
          >
            walking distance
          </Link>
          &nbsp; of the Library. However, the last MARC train departs Baltimore
          at 6pm.
        </Typography>
      </CardContent>
    </StandardCard>
    <ContinueBar back='/directions' next='/where-to-stay' />
  </ColumnLayout>
);
