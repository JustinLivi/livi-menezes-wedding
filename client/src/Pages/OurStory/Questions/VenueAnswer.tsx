import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
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

export interface VenueAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledVenueAnswer extends React.Component<VenueAnswerProps> {
  public render() {
    const {
      classes: { avatar, content, topName, italic, centered }
    } = this.props;
    return (
      <StandardCard>
        <CardContent className={content}>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            TODO
          </Typography>
        </CardContent>
      </StandardCard>
    );
  }
}

export const VenueAnswer = withStyles(styles)(UnstyledVenueAnswer);
