import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 400
  },
  root: {
    margin: theme.spacing.unit,
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center'
  }
});

export interface StandardCardProps extends WithStyles<typeof styles> {}

export const UnstyledStandardCard: React.SFC<StandardCardProps> = ({
  classes: { card, root },
  children
}) => (
  <div className={root}>
    <Card className={card}>{children}</Card>
  </div>
);

export const StandardCard = withStyles(styles)(UnstyledStandardCard);
