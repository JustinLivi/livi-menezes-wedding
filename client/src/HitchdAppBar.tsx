import { AppBar, createStyles, Toolbar, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

import { Hamburger } from './Hamburger';
import { HeaderText } from './HeaderText';
import { Logo } from './icons/Logo';
import { theme } from './theme';

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  toolbar: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 400,
    padding: 0
  },
  appBar: {
    display: 'inline-flex',
    minWidth: '100%',
    width: 'initial',
    flexDirection: 'row',
    boxShadow: 'none',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[200]
  }
});

export interface HitchdAppBarProps extends WithStyles<typeof styles> {}

export const UnstyledAppBar: React.SFC<HitchdAppBarProps> = ({
  classes: { root, appBar, toolbar }
}) => (
  <div className={root}>
    <AppBar position='static' elevation={2} classes={{ root: appBar }}>
      <Toolbar classes={{ root: toolbar }}>
        <HeaderText />
        <Logo />
        <Hamburger />
      </Toolbar>
    </AppBar>
  </div>
);

export const HitchdAppBar = withStyles(styles)(UnstyledAppBar);
