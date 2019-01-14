import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
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

export interface StandardCardProps extends WithStyles<typeof styles> {
  className?: string;
}

export const UnstyledStandardCard: React.SFC<StandardCardProps> = ({
  className,
  classes: { card, root },
  children
}) => (
  <div className={root}>
    <Card className={classnames(card, className)}>{children}</Card>
  </div>
);

export const StandardCard = withStyles(styles)(UnstyledStandardCard);
