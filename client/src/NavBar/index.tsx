import { AppBar, createStyles, Toolbar, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

import { theme } from '../theme';
import { Hamburger } from './Hamburger';
import { HeaderText } from './HeaderText';
import { Logo } from './Logo';

const styles = createStyles({
  appBar: {
    borderBottomColor: theme.palette.grey[200],
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    boxShadow: 'none',
    display: 'inline-flex',
    flexDirection: 'row',
    minWidth: 'calc(100% - 240px);',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%'
    },
    width: 'initial'
  },
  root: {
    flexGrow: 0
  },
  toolbar: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 400,
    padding: 0
  }
});

export interface INavBarProps extends WithStyles<typeof styles> {}

export const UnstyledAppBar: React.SFC<INavBarProps> = ({
  classes: { root, appBar, toolbar }
}) => (
  <div className={root}>
    <AppBar position='fixed' elevation={2} classes={{ root: appBar }}>
      <Toolbar classes={{ root: toolbar }}>
        <HeaderText />
        <Logo />
        <Hamburger />
      </Toolbar>
    </AppBar>
  </div>
);

export const NavBar = withStyles(styles)(UnstyledAppBar);
