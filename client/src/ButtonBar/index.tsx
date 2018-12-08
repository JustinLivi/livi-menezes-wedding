import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details } from './Details';
import { ImGoing } from './ImGoing';

const styles = createStyles({
  root: {
    display: 'flex',
    flexGrow: 0,
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

export interface ButtonBarProps extends WithStyles<typeof styles> {
  toDetails: string;
  onlyInfo?: true;
  hideHelp?: true;
  external?: boolean;
}

export const UnstyledButtonBar: React.SFC<ButtonBarProps> = ({
  onlyInfo,
  hideHelp,
  toDetails,
  external,
  classes: { root, buttonBar }
}) => (
  <div className={root}>
    <div className={buttonBar}>
      {!onlyInfo && <CantMakeIt hideHelp={hideHelp} />}
      <Details hideHelp={hideHelp} to={toDetails} external={external} />
      {!onlyInfo && <ImGoing hideHelp={hideHelp} />}
    </div>
  </div>
);

export const ButtonBar = withStyles(styles)(UnstyledButtonBar);
