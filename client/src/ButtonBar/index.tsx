import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details } from './Details';
import { ImGoing } from './ImGoing';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center',
    margin: theme.spacing.unit
  },
  buttonBar: {
    flexGrow: 0
  }
});

export interface ButtonBarProps extends WithStyles<typeof styles> {}

export const UnstyledButtonBar: React.SFC<ButtonBarProps> = ({
  classes: { root, buttonBar }
}) => (
  <div className={root}>
    <div className={buttonBar}>
      <CantMakeIt />
      <Details />
      <ImGoing />
    </div>
  </div>
);

export const ButtonBar = withStyles(styles)(UnstyledButtonBar);
