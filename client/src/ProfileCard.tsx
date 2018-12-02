import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { theme } from './theme';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 400
  },
  media: {
    height: 360,
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 308px)'
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

export interface ProfileCardProps extends WithStyles<typeof styles> {
  image: string;
  title: string;
  blurb?: React.ReactType<any>;
}

export const UnstyledProfileCard: React.SFC<ProfileCardProps> = ({
  image,
  title,
  blurb,
  classes: { root, card, media }
}) => (
  <div className={root}>
    <Card className={card}>
      <CardActionArea>
        <CardMedia className={media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          {blurb && <Typography component='p'>{blurb}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
