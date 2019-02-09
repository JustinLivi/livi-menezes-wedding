import { Avatar, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { CantMakeIt } from '../../ButtonBar/CantMakeIt';
import { ImGoing } from '../../ButtonBar/ImGoing';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import defaultProfile from '../../profiles/default_profile.jpg';

export const styles = createStyles({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  buttons: {
    borderWidth: 2,
    height: 40,
    margin: 0,
    marginRight: 10,
    width: 40
  },
  centered: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  row: {
    marginBottom: 10
  }
});

export interface ReviewResponseProps extends WithStyles<typeof styles> {
  photo?: string;
  name?: string;
  rehearsal: boolean;
  attendingWedding?: boolean;
  attendingRehearsal?: boolean;
  handleCantMakeIt: React.MouseEventHandler;
  handleImGoing: React.MouseEventHandler;
  handleCantMakeItRehearsal: React.MouseEventHandler;
  handleImGoingRehearsal: React.MouseEventHandler;
}

export const UnstyledReviewResponse: React.SFC<ReviewResponseProps> = ({
  photo,
  name,
  attendingWedding,
  handleCantMakeIt,
  handleImGoing,
  handleCantMakeItRehearsal,
  handleImGoingRehearsal,
  rehearsal,
  attendingRehearsal,
  classes: { avatar, italic, centered, buttons, row }
}) => (
  <Grid>
    <Grid className={avatar}>
      <Avatar
        alt='You'
        src={photo ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}` : defaultProfile}
      >
        {name || 'loading...'}
      </Avatar>
    </Grid>
    <Grid>
      <Typography
        className={classnames(italic, centered)}
        gutterBottom
        variant='body1'
        component='p'
      >
        {name}
      </Typography>
    </Grid>
    <Grid className={row} container direction='row' alignItems='center'>
      <CantMakeIt
        fontSize='small'
        onClick={handleCantMakeIt}
        className={buttons}
        selected={attendingWedding === false}
        disabled={attendingWedding === false}
      />
      <ImGoing
        fontSize='small'
        onClick={handleImGoing}
        className={buttons}
        selected={attendingWedding === true}
        disabled={attendingWedding === true}
      />
      <Typography variant='body1' component='span'>
        {attendingWedding === false
          ? 'Not Attending Wedding'
          : attendingWedding === true
          ? 'Attending Wedding'
          : 'No RSVP'}
      </Typography>
    </Grid>
    {rehearsal && (
      <Grid className={row} container direction='row' alignItems='center'>
        <CantMakeIt
          fontSize='small'
          onClick={handleCantMakeItRehearsal}
          className={buttons}
          selected={attendingRehearsal === false}
          disabled={attendingRehearsal === false}
        />
        <ImGoing
          fontSize='small'
          onClick={handleImGoingRehearsal}
          className={buttons}
          selected={attendingRehearsal === true}
          disabled={attendingRehearsal === true}
        />
        <Typography variant='body1' component='span'>
          {attendingRehearsal === false
            ? 'Not Attending Rehearsal Dinner'
            : attendingRehearsal === true
            ? 'Attending Rehearsal Dinner'
            : 'No RSVP'}
        </Typography>
      </Grid>
    )}
  </Grid>
);

export const ReviewResponse = withStyles(styles)(UnstyledReviewResponse);
