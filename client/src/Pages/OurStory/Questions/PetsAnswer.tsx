import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ProfileCard } from '../../../Components/ProfileCard';
import familyPortrait from './family_portrait.jpg';

const styles = createStyles({
  media: {
    backgroundSize: 'cover',
    height: 400
  },
  root: {
    '&:last-child': {
      padding: 0
    },
    padding: 0
  }
});

export interface PetsAnswerProps extends WithStyles<typeof styles> {}

export const UnstyledPetsAnswer: React.SFC<PetsAnswerProps> = ({ classes }) => (
  <ProfileCard classes={classes} image={familyPortrait} />
);

export const PetsAnswer = withStyles(styles)(UnstyledPetsAnswer);
