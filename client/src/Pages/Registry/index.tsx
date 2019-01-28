import { CardContent, Link, Typography } from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { ZolaLogo } from './ZolaLogo';

export const Registry: React.SFC = () => (
  <ColumnLayout>
    <StandardCard>
      <CardContent>
        <Typography variant='h4' component='h1'>
          Registry
        </Typography>
        <hr />
        <Typography variant='body1' gutterBottom>
          We <strong>do not</strong> need any gifts for our wedding - your
          presence is present enough!
        </Typography>
        <Typography variant='body1' gutterBottom>
          If you feel compelled to give, we are registered on
        </Typography>
        <Typography gutterBottom>
          <Link target='_blank' href='www.zola.com/registry/livimenezeswedding'>
            <ZolaLogo />
          </Link>
        </Typography>
        <Typography variant='body1' gutterBottom>
          If you would prefer to write a check as a gift, please make it out
          to&nbsp;
          <strong>Marisa Menezes and Justin Livi.</strong>
        </Typography>
        <Typography variant='body1' gutterBottom>
          We appreciate your thoughtfulness and generosity!
        </Typography>
      </CardContent>
    </StandardCard>
    <ContinueBar back='/where-to-stay/details' next='/things-to-do' />
  </ColumnLayout>
);
