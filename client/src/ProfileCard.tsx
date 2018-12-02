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
    maxWidth: 400
  },
  media: {
    height: 300,
    maxHeight: '40vh'
  },
  root: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center'
  }
});

export interface ProfileCardProps extends WithStyles<typeof styles> {
  image: string;
}

export const UnstyledProfileCard: React.SFC<ProfileCardProps> = ({
  image,
  classes: { root, card, media }
}) => (
  <div className={root}>
    <Card className={card}>
      <CardActionArea>
        <CardMedia
          className={media}
          image={image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
