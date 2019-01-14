import { CardContent, CardMedia, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { StandardCard } from './StandardCard';

const styles = createStyles({
  media: {
    height: 360,
    maxHeight: 'calc(100vh - 350px)',
    maxWidth: '100%'
  },
  root: {
    '&:last-child': { paddingBottom: 10 },
    paddingTop: 10
  }
});

export interface ProfileCardProps extends WithStyles<typeof styles> {
  image: string;
  title: string;
  blurb?: React.ReactNode;
}

export const UnstyledProfileCard: React.SFC<ProfileCardProps> = ({
  image,
  title,
  blurb,
  children,
  classes: { media, root }
}) => (
  <StandardCard>
    {children ? (
      <CardMedia className={media} title={title} image={image}>
        {children}
      </CardMedia>
    ) : (
      <CardMedia className={media} image={image} title={title} />
    )}
    <CardContent className={root}>
      <Typography gutterBottom variant='h5' component='h2'>
        {title}
      </Typography>
      {blurb && typeof blurb === 'string' ? (
        <Typography component='p'>{blurb}</Typography>
      ) : (
        blurb
      )}
    </CardContent>
  </StandardCard>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
