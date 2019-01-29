import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    alignItems: 'stretch',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: '100vw',
    minHeight: 600,
    overflowX: 'hidden'
  }
});

export interface ColumnLayoutProps extends WithStyles<typeof styles> {
  style?: React.CSSProperties;
}

export const UnstyledColumnLayout: React.SFC<ColumnLayoutProps> = ({
  classes: { root },
  style,
  children
}) => (
  <div style={style} className={root}>
    {children}
  </div>
);

export const ColumnLayout = withStyles(styles)(UnstyledColumnLayout);
