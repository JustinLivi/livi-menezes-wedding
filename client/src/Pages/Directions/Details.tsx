import { Button, Card, CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { GoogleMap } from '../../Components/GoogleMap';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { theme } from '../../theme';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 400
  },
  root: {
    margin: theme.spacing.unit,
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center'
  }
});

export interface DirectionsDetailsProps extends WithStyles<typeof styles> {}

export const UnstyledDirectionsDetails: React.SFC<DirectionsDetailsProps> = ({
  classes: { root, card }
}) => (
  <ColumnLayout>
    <div className={root}>
      <Card className={card} raised={false}>
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
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Directions
          </Typography>
          <Button size='small'>
            Get Directions to the George Peabody Library
          </Button>
        </CardContent>
      </Card>
    </div>
  </ColumnLayout>
);

export const DirectionsDetails = withStyles(styles)(UnstyledDirectionsDetails);
