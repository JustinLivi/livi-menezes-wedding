import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 400
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

export interface IStandardCardProps extends WithStyles<typeof styles> {}

export const UnstyledStandardCard: React.SFC<IStandardCardProps> = ({
  classes: { card, root },
  children
}) => (
  <div className={root}>
    <Card className={card}>{children}</Card>
  </div>
);

export const StandardCard = withStyles(styles)(UnstyledStandardCard);
