import { CardContent, CardMedia, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { StandardCard } from './StandardCard';

const styles = createStyles({
  media: {
    height: 360,
    maxHeight: 'calc(100vh - 308px)',
    maxWidth: '100%'
  }
});

export interface IProfileCardProps extends WithStyles<typeof styles> {
  image: string;
  title: string;
  blurb?: React.ReactType<any>;
}

export const UnstyledProfileCard: React.SFC<IProfileCardProps> = ({
  image,
  title,
  blurb,
  children,
  classes: { media }
}) => (
  <StandardCard>
    {children ? (
      <CardMedia className={media} title={title} image={image}>
        {children}
      </CardMedia>
    ) : (
      <CardMedia className={media} image={image} title={title} />
    )}
    <CardContent>
      <Typography gutterBottom variant='h5' component='h2'>
        {title}
      </Typography>
      {blurb && <Typography component='p'>{blurb}</Typography>}
    </CardContent>
  </StandardCard>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
