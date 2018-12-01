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

const styles = createStyles({
  card: {
    maxWidth: 400
  },
  media: {
    height: 300
  },
  flexRow: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  grow: {
    flexGrow: 1
  }
});

export interface ProfileCardProps extends WithStyles<typeof styles> {
  image: string;
}

export const UnstyledProfileCard: React.SFC<ProfileCardProps> = ({
  image,
  classes
}) => (
  <div className={classes.flexRow}>
    <div className={classes.grow} />
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
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
    <div className={classes.grow} />
  </div>
);

export const ProfileCard = withStyles(styles)(UnstyledProfileCard);
