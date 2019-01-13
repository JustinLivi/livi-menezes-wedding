import { createStyles, Grid, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {
    padding: 16,
    paddingTop: 90
  }
});

export interface GridLayoutProps extends WithStyles<typeof styles> {}

export const UnstyledGridLayout: React.SFC<GridLayoutProps> = ({
  classes: { root },
  children
}) => (
  <Grid container spacing={16} className={root}>
    {children}
  </Grid>
);

export const GridLayout = withStyles(styles)(UnstyledGridLayout);
