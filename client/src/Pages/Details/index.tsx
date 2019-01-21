import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

const styles = createStyles({
  hr: {
    marginBottom: 15,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15
  },
  italic: {
    fontStyle: 'italic'
  },
  names: {
    letterSpacing: 5
  },
  root: {
    paddingTop: 25,
    textAlign: 'center'
  },
  topName: {
    marginBottom: 0
  }
});

export interface DetailsProps extends WithStyles<typeof styles> {}

export const UnstyledDetails: React.SFC<DetailsProps> = ({
  classes: { root, topName, names, hr, italic }
}) => (
  <ColumnLayout>
    <StandardCard>
      <CardContent className={root}>
        <Typography gutterBottom variant='body1' component='p'>
          Together with their families
        </Typography>
        <Typography
          className={classnames(names, topName)}
          variant='h6'
          component='p'
        >
          Marisa E. Menezes
        </Typography>
        <Typography
          className={classnames(names, topName)}
          variant='h5'
          component='p'
        >
          &amp;
        </Typography>
        <Typography gutterBottom className={names} variant='h6' component='p'>
          Justin S. Livi
        </Typography>
        <Typography variant='body1' component='p'>
          invite you to their wedding
        </Typography>
        <hr className={hr} />
        <Typography variant='h6' component='p'>
          Sunday, October 13, 2019 at 4:00pm
        </Typography>
        <Typography variant='body1' component='p'>
          The George Peabody Library
        </Typography>
        <Typography variant='body1' component='p'>
          Baltimore, Maryland
        </Typography>
        <hr className={hr} />
        <Typography variant='body1' component='p'>
          Cocktails, dinner, and dancing will follow
          <br />
          at the same venue
        </Typography>
        <Typography gutterBottom variant='body1' component='p'>
          Attire: Cocktail dress
        </Typography>
        <Typography
          className={italic}
          gutterBottom
          variant='body1'
          component='p'
        >
          * Please RSVP by September 1, 2019 *
        </Typography>
      </CardContent>
    </StandardCard>
    <RsvpBar
      onlyInfo
      toDetails='/rsvp'
      detailsIconType={DetailsIcons.nextArrow}
    />
  </ColumnLayout>
);

export const Details = withStyles(styles)(UnstyledDetails);
