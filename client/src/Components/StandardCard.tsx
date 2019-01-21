import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { theme } from '../theme';
import { SwipeableCard } from './SwipeableCard';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 'calc(100vw - 16px)'
  },
  defaultCard: {
    maxWidth: 'calc(100vw - 16px)',
    width: 400
  },
  root: {
    alignItems: 'center',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'center',
    margin: theme.spacing.unit,
    maxWidth: '100vw'
  }
});

export interface StandardCardProps extends WithStyles<typeof styles> {
  className?: string;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export const UnstyledStandardCard: React.SFC<StandardCardProps> = ({
  className,
  swipeRight,
  swipeLeft,
  classes: { card, root, defaultCard },
  children
}) => (
  <div className={root}>
    <Card className={classnames(defaultCard, className)} />
    <SwipeableCard
      className={card}
      swipeRight={swipeRight}
      swipeLeft={swipeLeft}
    >
      <Card className={className}>{children}</Card>
    </SwipeableCard>
  </div>
);

export const StandardCard = withStyles(styles)(UnstyledStandardCard);
