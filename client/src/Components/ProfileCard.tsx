import { CardContent, CardMedia, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { StandardCard } from './StandardCard';

const styles = createStyles({
  header: {
    fontSize: '1.1rem'
  },
  media: {
    height: 350,
    // maxHeight: 'calc(100vh - 400px)',
    maxWidth: '100%',
    minHeight: 250
  },
  root: {
    '&:last-child': { paddingBottom: 10 },
    paddingTop: 10
  }
});

export interface ProfileCardProps extends WithStyles<typeof styles> {
  image: string;
  title?: string;
  swipe?: boolean;
  blurb?: React.ReactNode;
  className?: string;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export const UnstyledProfileCard: React.SFC<ProfileCardProps> = ({
  image,
  title,
  blurb,
  children,
  className,
  swipe,
  swipeRight,
  swipeLeft,
  classes: { media, root, header }
}) => (
  <StandardCard
    swipe={swipe}
    className={className}
    swipeRight={swipeRight}
    swipeLeft={swipeLeft}
  >
    {children ? (
      <CardMedia className={media} title={title} image={image}>
        {children}
      </CardMedia>
    ) : (
      <CardMedia className={media} image={image} title={title} />
    )}
    <CardContent className={root}>
      {title && (
        <Typography
          classes={{ h5: header }}
          gutterBottom
          variant='h5'
          component='h2'
        >
          {title}
        </Typography>
      )}
      {blurb && typeof blurb === 'string' ? (
        <Typography component='p'>{blurb}</Typography>
      ) : (
        blurb
      )}
    </CardContent>
  </StandardCard>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
