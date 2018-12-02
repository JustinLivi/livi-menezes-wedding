import { createStyles, IconButton, WithStyles, withStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as React from 'react';

const styles = createStyles({
  iconButton: {
    width: '3em',
    height: '3em'
  },
  menu: {
    width: '2em',
    height: '2em'
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row-reverse'
  }
});

export interface HamburgerProps extends WithStyles<typeof styles> {}

export const UnstyledHamburger: React.SFC<HamburgerProps> = ({
  classes: { root, iconButton, menu }
}) => (
  <span className={root}>
    <IconButton className={iconButton} color='inherit' aria-label='Menu'>
      <Menu classes={{ root: menu }} />
    </IconButton>
  </span>
);

export const Hamburger = withStyles(styles)(UnstyledHamburger);
