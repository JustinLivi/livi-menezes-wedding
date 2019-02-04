import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ProfileCard } from '../../../Components/ProfileCard';
import yourSeat from './your_seat.jpg';

const styles = createStyles({
  media: {
    backgroundSize: 'cover',
    height: 450,
    maxWidth: '100%'
  }
});

export interface TravelAnswerProps extends WithStyles<typeof styles> {}

export const UnstyledTravelAnswer: React.SFC<TravelAnswerProps> = ({
  classes: { media }
}) => (
  <ProfileCard
    classes={{ media }}
    image={yourSeat}
    blurb='#yourseat - Marisa accidentally planned a very romantic trip to Croatia as a solo trip.'
  />
);

export const TravelAnswer = withStyles(styles)(UnstyledTravelAnswer);
