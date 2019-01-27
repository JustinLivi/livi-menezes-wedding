import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import * as React from 'react';

const styles = createStyles({
  centered: {
    textAlign: 'center'
  },
  hr: {
    marginBottom: 15,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15
  },
  italic: {
    fontStyle: 'italic'
  }
});

export const UnstyledRehearsalDetails: React.SFC<WithStyles<typeof styles>> = ({
  classes: { centered, hr, italic }
}) => (
  <div className={centered}>
    <hr className={hr} />

    <Typography variant='h6' component='p'>
      Saturday, October 12, 2019 at 6pm
    </Typography>

    <Typography variant='body1'>
      <Link target='_blank' href='http://www.homeslyce.com/'>
        HomeSlyce Pizza Bar
      </Link>
    </Typography>
    <Typography variant='body1' component='p'>
      <Link
        target='_blank'
        href='https://www.google.com/maps/dir//homeslyce+baltimore/@39.2937893,-76.6507605,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c80498d765b4fb:0xae050281878a5f0d!2m2!1d-76.6157412!2d39.2937281'
      >
        336 N Charles St.
        <br />
        Baltimore, MD 21201
      </Link>
    </Typography>

    <hr className={hr} />

    <Typography variant='body1' component='p'>
      Dress is very casual, expect to play&nbsp;
      <Link
        target='_blank'
        href='https://www.hayneedle.com/tips-and-ideas/bocce-ball-rules/'
      >
        bocce ball.
      </Link>
    </Typography>
    <Typography className={italic} gutterBottom variant='body1' component='p'>
      Please walk, take a ride share, or street park.
    </Typography>
  </div>
);

export const RehearsalDetails = withStyles(styles)(UnstyledRehearsalDetails);
