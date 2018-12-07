import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    paddingTop: 74,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    boxPack: 'center'
  }
});

export interface ColumnLayoutProps extends WithStyles<typeof styles> {}

export const UnstyledColumnLayout: React.SFC<ColumnLayoutProps> = ({
  classes: { root },
  children
}) => <div className={root}>{children}</div>;

export const ColumnLayout = withStyles(styles)(UnstyledColumnLayout);
