import { AppBar, createStyles, Toolbar, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

import { Hamburger } from './Hamburger';
import { HeaderText } from './HeaderText';
import { Logo } from './Logo';
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
  logo: {
    flexGrow: 1,
    textAlign: 'center'
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
        <HeaderText />
        <Logo />
        <Hamburger />
      </Toolbar>
    </AppBar>
  </div>
);

export const HitchdAppBar = withStyles(styles)(UnstyledAppBar);
