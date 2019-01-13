import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details } from './Details';
import { ImGoing } from './ImGoing';

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
    justifyContent: 'center',
    margin: theme.spacing.unit
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
