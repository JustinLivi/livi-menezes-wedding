import { Avatar, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { CantMakeIt } from '../../ButtonBar/CantMakeIt';
import { ImGoing } from '../../ButtonBar/ImGoing';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';

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
}

export const UnstyledReviewResponse: React.SFC<ReviewResponseProps> = ({
  photo,
  name,
  attendingWedding,
  handleCantMakeIt,
  handleImGoing,
  rehearsal,
  attendingRehearsal,
  classes: { avatar, italic, centered, buttons, row }
}) => (
  <Grid>
    <Grid className={avatar}>
      <Avatar alt='You' src={`${REACT_APP_PICTURE_ENDPOINT}/${photo}`}>
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
        hideHelp
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
        Attending Wedding
      </Typography>
    </Grid>
    {rehearsal && (
      <Grid className={row} container direction='row' alignItems='center'>
        <CantMakeIt
          fontSize='small'
          hideHelp
          onClick={handleCantMakeIt}
          className={buttons}
          selected={attendingRehearsal === false}
          disabled={attendingRehearsal === false}
        />
        <ImGoing
          fontSize='small'
          onClick={handleImGoing}
          className={buttons}
          selected={attendingRehearsal === true}
          disabled={attendingRehearsal === true}
        />
        <Typography variant='body1' component='span'>
          Attending Rehearsal
        </Typography>
      </Grid>
    )}
  </Grid>
);

export const ReviewResponse = withStyles(styles)(UnstyledReviewResponse);
