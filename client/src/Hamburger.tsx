import { createStyles, IconButton, WithStyles, withStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as React from 'react';

const styles = createStyles({
  hamburgerHolder: {
    width: '3em',
    height: '3em'
  },
  root: {
    width: '2em',
    height: '2em'
  }
});

export interface HamburgerProps extends WithStyles<typeof styles> {}

export const UnstyledHamburger: React.SFC<HamburgerProps> = ({ classes }) => (
  <IconButton
    className={classes.hamburgerHolder}
    color='inherit'
    aria-label='Menu'
  >
    <Menu classes={classes} />
  </IconButton>
);

export const Hamburger = withStyles(styles)(UnstyledHamburger);
