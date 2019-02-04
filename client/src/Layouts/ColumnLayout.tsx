import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';

const styles = createStyles({
  root: {
    alignItems: 'stretch',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    maxWidth: '100vw',
    overflowX: 'hidden',
    paddingTop: 78,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'start',
      paddingBottom: 120
    }
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
