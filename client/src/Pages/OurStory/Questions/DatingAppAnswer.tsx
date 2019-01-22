import { CardMedia, createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ProfileCard } from '../../../Components/ProfileCard';
import tinderLogo from './tinder_logo.jpg';
import tinderProfiles from './tinder_profiles.jpg';

const styles = createStyles({
  media: {
    backgroundSize: 'contain',
    height: 350,
    maxWidth: '100%'
  },
  tinderLogoMedia: {
    backgroundSize: 'contain',
    height: 75,
    maxWidth: '100%'
  }
});

export interface DatingAppAnswerProps extends WithStyles<typeof styles> {}

export const UnstyledDatingAppAnswer: React.SFC<DatingAppAnswerProps> = ({
  classes: { media, tinderLogoMedia }
}) => (
  <ProfileCard
    classes={{ media }}
    image={tinderProfiles}
    blurb={<CardMedia className={tinderLogoMedia} image={tinderLogo} />}
  />
);

export const DatingAppAnswer = withStyles(styles)(UnstyledDatingAppAnswer);
