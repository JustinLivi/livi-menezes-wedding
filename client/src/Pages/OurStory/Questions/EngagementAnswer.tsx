import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ProfileCard } from '../../../Components/ProfileCard';
import laOverlook from './la-overlook.jpg';

const styles = createStyles({
  media: {
    backgroundSize: 'cover',
    height: 150,
    minHeight: 0
  }
});

export interface EngagementAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledEngagementAnswer extends React.Component<
  EngagementAnswerProps
> {
  public render() {
    const { classes } = this.props;
    return (
      <ProfileCard
        classes={classes}
        image={laOverlook}
        blurb={
          <div>
            <Typography component='p' gutterBottom>
              In July 2018, Justin brought a travel guitar all the way to
              California for our friends’ wedding. Justin wrote new lyrics to a
              song for Marisa. He played it for her “to get her opinion,” but
              then did not actually propose.
            </Typography>
            <Typography component='p' gutterBottom>
              Afterwards, we went on a hike, he got down on one knee, and
              proposed near an overlook.
            </Typography>
            <Typography component='p' gutterBottom>
              On October 13, 2018, our one-year-to-be wedding anniversary,
              Marisa surprised Justin by dressing JJ and Nugget up in their
              finest and invited him to slow dance to our wedding song in our
              living room in our new house.
            </Typography>
          </div>
        }
      />
    );
  }
}

export const EngagementAnswer = withStyles(styles)(UnstyledEngagementAnswer);
