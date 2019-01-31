import { CardContent, createStyles, Link, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { ZolaLogo } from './ZolaLogo';

const styles = createStyles({
  centered: {
    paddingTop: 20,
    textAlign: 'center'
  },
  logo: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    width: '60%'
  }
});

export const UnstyledRegistry: React.SFC<WithStyles<typeof styles>> = ({
  classes: { centered, logo }
}) => (
  <ColumnLayout>
    <StandardCard>
      <CardContent>
        <Typography variant='h4' component='h1'>
          Registry
        </Typography>
        <hr />
        <div className={centered}>
          <Typography variant='body1' gutterBottom>
            We are registered on
          </Typography>
          <Typography className={logo}>
            <Link
              target='_blank'
              href='www.zola.com/registry/livimenezeswedding'
            >
              <ZolaLogo />
            </Link>
          </Typography>
          <Typography variant='h6' className={logo} gutterBottom>
            <Link
              target='_blank'
              href='www.zola.com/registry/livimenezeswedding'
            >
              Visit Registry
            </Link>
          </Typography>
          <Typography variant='body1'>
            If you would prefer to write a check as a gift, please make it out
            to
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Marisa Menezes and Justin Livi.</strong>
          </Typography>
          <Typography variant='body1' gutterBottom>
            We appreciate your thoughtfulness and generosity!
          </Typography>
        </div>
      </CardContent>
    </StandardCard>
    <ContinueBar back='/where-to-stay/details' next='/things-to-do' />
  </ColumnLayout>
);

export const Registry = withStyles(styles)(UnstyledRegistry);
