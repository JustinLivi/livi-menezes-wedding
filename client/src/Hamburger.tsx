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
  },
  grow: {
    flexGrow: 1,
    display: 'flex'
  }
});

export interface HamburgerProps extends WithStyles<typeof styles> {}

export const UnstyledHamburger: React.SFC<HamburgerProps> = ({
  classes: { grow, hamburgerHolder, root }
}) => (
  <span className={grow}>
    <span className={grow} />
    <IconButton className={hamburgerHolder} color='inherit' aria-label='Menu'>
      <Menu classes={{ root }} />
    </IconButton>
  </span>
);

export const Hamburger = withStyles(styles)(UnstyledHamburger);
