import { AppBar, createStyles, Toolbar, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

import { Hamburger } from './Hamburger';
import { HeaderText } from './HeaderText';
import { Logo } from './icons/Logo';
import { theme } from './theme';

const styles = createStyles({
  grow: {
    flexGrow: 1
  },
  centerBar: {
    flexGrow: 1,
    margin: 'auto'
  },
  root: {
    maxWidth: 400,
    padding: 0
  },
  paperElevation2: {
    display: 'inline-flex',
    minWidth: '100%',
    width: 'initial',
    flexDirection: 'row',
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
  <div className={classes.grow}>
    <AppBar
      position='static'
      elevation={2}
      classes={{ root: classes.paperElevation2 }}
    >
      <Toolbar className={classes.centerBar} classes={{ root: classes.root }}>
        <HeaderText />
        <Logo />
        <Hamburger />
      </Toolbar>
    </AppBar>
  </div>
);

export const HitchdAppBar = withStyles(styles)(UnstyledAppBar);
