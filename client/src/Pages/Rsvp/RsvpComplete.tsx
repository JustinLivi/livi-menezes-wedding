import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import { root } from 'cheerio';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import celebrate from './Celebrate.jpg';

const styles = createStyles({
  ...buttonBarStyles,
  centered: {
    textAlign: 'center'
  },
  topName: {
    marginBottom: 15
  }
});

export interface CantMakeItCardProps extends WithStyles<typeof styles> {}

export const UnstyledRsvpComplete: React.SFC<CantMakeItCardProps> = ({
  classes: { topName, centered, buttonBar, root: buttonBarRoot }
}) => (
  <ColumnLayout>
    <ProfileCard
      image={celebrate}
      title='RSVP Complete!'
      blurb={
        <React.Fragment>
          <Typography component='p'>
            Thanks for taking the time to respond!
          </Typography>
          <Typography component='p'>
            Continue below to test your knowledge of our story.
          </Typography>
        </React.Fragment>
      }
    />
    <ContinueBar back='/rsvp/review' next='/our-story' />
  </ColumnLayout>
);

export const RsvpComplete = withStyles(styles)(UnstyledRsvpComplete);
