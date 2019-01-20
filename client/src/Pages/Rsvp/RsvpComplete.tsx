import { Avatar, CardContent, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import { root } from 'cheerio';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Details, DetailsIcons } from '../../ButtonBar/Details';
import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { StandardCard } from '../../Components/StandardCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { getName, getPhoto } from '../../store/selectors/user';

const styles = createStyles({
  ...buttonBarStyles,
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
  standardCard: {
    overflow: 'initial',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface CantMakeItCardProps extends WithStyles<typeof styles> {
  photo?: string;
  name?: string;
}

export const UnconnectedRsvpComplete: React.SFC<CantMakeItCardProps> = ({
  photo,
  name,
  classes: {
    topName,
    centered,
    standardCard,
    content,
    avatar,
    buttonBar,
    root: buttonBarRoot
  }
}) => (
  <ColumnLayout>
    <StandardCard className={standardCard}>
      <CardContent className={content}>
        <Grid className={avatar}>
          <Avatar alt='You' src={`${REACT_APP_PICTURE_ENDPOINT}/${photo}`}>
            {name}
          </Avatar>
        </Grid>
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
      </CardContent>
    </StandardCard>
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

export const mapStateToProps = createSelector(
  [getName, getPhoto],
  (name, photo) => ({
    name,
    photo
  })
);

export const UnstyledRsvpComplete = connect(mapStateToProps)(
  UnconnectedRsvpComplete
);

export const RsvpComplete = withStyles(styles)(UnstyledRsvpComplete);
