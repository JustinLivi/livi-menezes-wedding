import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { StandardCard } from '../../../Components/StandardCard';

const styles = createStyles({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  italic: {
    fontStyle: 'italic'
  },
  topName: {
    marginBottom: 15
  }
});

export interface EngagementAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledEngagementAnswer extends React.Component<
  EngagementAnswerProps
> {
  public render() {
    const {
      classes: { avatar, content, topName, italic, centered }
    } = this.props;
    return (
      <StandardCard>
        <CardContent className={content}>
          <Typography className={topName} component='p'>
            In July 2018, Justin brought a travel guitar all the way to
            California for our friends’ wedding. Justin wrote new lyrics to a
            song for Marisa. He played it for her “to get her opinion,” but then
            did not actually propose. Afterwards, we went on a hike, he got down
            on one knee, and proposed near an overlook. On October 13, 2018, our
            one-year-to-be wedding anniversary, Marisa surprised Justin by
            dressing JJ and Nugget up in their finest and invited him to slow
            dance to our wedding song in our living room in our new house.
          </Typography>
        </CardContent>
      </StandardCard>
    );
  }
}

export const EngagementAnswer = withStyles(styles)(UnstyledEngagementAnswer);
