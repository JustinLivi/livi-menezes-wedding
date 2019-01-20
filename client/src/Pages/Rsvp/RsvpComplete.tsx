import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import { root } from 'cheerio';
import classnames from 'classnames';
import * as React from 'react';

import { Details, DetailsIcons } from '../../ButtonBar/Details';
import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { AvatarCard } from './AvatarCard';

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
    <AvatarCard>
      <Typography
        className={classnames(topName, centered)}
        variant='h6'
        component='p'
      >
        RSVP Complete!
      </Typography>
      <Typography className={topName} component='p'>
        Thanks for responding!
      </Typography>
      <Typography className={topName} component='p'>
        Check out some of the menu options or continue below to test your
        knowledge of our story.
      </Typography>
    </AvatarCard>
    <div className={buttonBarRoot}>
      <div className={buttonBar}>
        <Details
          to='/our-story'
          iconType={DetailsIcons.nextArrow}
          help='continue'
        />
      </div>
    </div>
  </ColumnLayout>
);

export const RsvpComplete = withStyles(styles)(UnstyledRsvpComplete);
