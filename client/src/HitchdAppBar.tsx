import { AppBar, createStyles, IconButton, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';

import { theme } from './theme';

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  paperElevation2: {
    boxShadow: 'none',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[200]
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export interface HitchdAppBarProps extends WithStyles<typeof styles> {}

export const UnstyledAppBar: React.SFC<HitchdAppBarProps> = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position='static' elevation={2} className={classes.paperElevation2}>
      <Toolbar>
        <Typography color='inherit' className={classes.grow}>
          Justin and Marisa are getting
        </Typography>
        <Typography color='inherit' className={classes.grow}>
          Hitchd
        </Typography>
        <IconButton
          className={classes.menuButton}
          color='inherit'
          aria-label='Menu'
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
);

export const HitchdAppBar = withStyles(styles)(UnstyledAppBar);
