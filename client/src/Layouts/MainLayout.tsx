import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    boxPack: 'center'
  }
});

export interface MainLayoutProps extends WithStyles<typeof styles> {}

export const UnstyledMainLayout: React.SFC<MainLayoutProps> = ({
  classes: { root },
  children
}) => <div className={root}>{children}</div>;

export const MainLayout = withStyles(styles)(UnstyledMainLayout);
