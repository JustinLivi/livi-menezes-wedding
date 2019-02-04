import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';

const styles = createStyles({
  buttonBar: {
    flexGrow: 0
  },
  root: {
    alignItems: 'center',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    height: 132,
    justifyContent: 'center',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-end',
      bottom: 0,
      height: 114,
      left: 0,
      position: 'fixed',
      right: 0
    }
  }
});

export const UnstyledButtonBar: React.SFC<WithStyles<typeof styles>> = ({
  children,
  classes: { root, buttonBar }
}) => (
  <div className={root}>
    <div className={buttonBar}>{children}</div>
  </div>
);

export const ButtonBar = withStyles(styles)(UnstyledButtonBar);
