import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { theme } from '../theme';
import { SwipeableCard } from './SwipeableCard';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxHeight: 'calc(100vh - 250px)',
    maxWidth: 'calc(100vw - 20px)',
    minHeight: 350
  },
  defaultCard: {
    maxHeight: 'calc(100vh - 250px)',
    maxWidth: 'calc(100vw - 20px)',
    minHeight: 350,
    opacity: 0,
    width: 400
  },
  innerCard: {
    maxHeight: 'calc(100vh - 270px)',
    maxWidth: '100vw',
    minHeight: 350,
    overflow: 'auto'
  },
  root: {
    alignItems: 'center',
    boxPack: 'center',
    display: 'inline-flex',
    flexDirection: 'row',
    flexGrow: 0,
    // height: 350,
    justifyContent: 'center',
    margin: theme.spacing.unit,
    position: 'relative'
  }
});

export interface StandardCardProps extends WithStyles<typeof styles> {
  swipe?: boolean;
  className?: string;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export const UnstyledStandardCard: React.SFC<StandardCardProps> = ({
  className,
  swipeRight,
  swipeLeft,
  swipe,
  classes: { card, root, defaultCard, innerCard },
  children
}) => (
  <div className={root}>
    <Card className={classnames(defaultCard, className)}>{children}</Card>
    <SwipeableCard
      swipe={swipe}
      className={card}
      swipeRight={swipeRight}
      swipeLeft={swipeLeft}
    >
      <Card className={classnames(innerCard, className)}>{children}</Card>
    </SwipeableCard>
  </div>
);

export const StandardCard = withStyles(styles)(UnstyledStandardCard);
