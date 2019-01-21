import { CardMedia, createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ProfileCard } from '../../../Components/ProfileCard';
import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';
import tinderLogo from './tinder_logo.jpg';
import tinderProfiles from './tinder_profiles.jpg';

const styles = createStyles({
  media: {
    backgroundSize: 'contain',
    height: 350,
    maxWidth: '100%'
  }
});

export interface DatingAppAnswerProps extends WithStyles<typeof styles> {}

export const UnstyledDatingAppAnswer: React.SFC<DatingAppAnswerProps> = ({
  classes: { media }
}) => (
  <ProfileCard
    classes={{ media }}
    image={tinderProfiles}
    blurb={<CardMedia className={media} image={tinderLogo} />}
  />
);

export const DatingAppAnswer = withStyles(styles)(UnstyledDatingAppAnswer);

export const DatingApp: React.SFC<Question> = props => (
  <div>
    <RadioButtonCard
      {...props}
      question='On what online dating app did we meet?'
      answers={[
        'Tinder',
        'OkCupid',
        'Coffee meets Bagel',
        'Bumble',
        'Farmers Only'
      ]}
    />
    <DatingAppAnswer />
  </div>
);
