import { Avatar, CardContent, createStyles, Grid, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { StandardCard } from '../../Components/StandardCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { getName, getPhoto } from '../../store/selectors/user';

const styles = createStyles({
  ...buttonBarStyles,
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  content: {
    paddingTop: 25
  },
  standardCard: {
    height: 450,
    maxHeight: 'calc(100vh - 260px)',
    overflow: 'auto',
    position: 'relative'
  }
});

export interface AvatarCardStateProps {
  photo?: string;
  name?: string;
}

export interface AvatarCardParentProps extends WithStyles<typeof styles> {
  swipe?: boolean;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export type AvatarCardProps = AvatarCardParentProps & AvatarCardStateProps;

export class UnconnectedAvatarCard extends React.Component<AvatarCardProps> {
  constructor(props: AvatarCardProps) {
    super(props);
  }

  public render() {
    const {
      children,
      swipe,
      swipeRight,
      swipeLeft,
      classes: { standardCard, content, avatar },
      photo,
      name
    } = this.props;
    return (
      <StandardCard
        className={standardCard}
        swipe={swipe}
        swipeRight={swipeRight}
        swipeLeft={swipeLeft}
      >
        <CardContent className={content}>
          <Grid className={avatar}>
            <Avatar alt='You' src={`${REACT_APP_PICTURE_ENDPOINT}/${photo}`}>
              {name}
            </Avatar>
          </Grid>
          {children}
        </CardContent>
      </StandardCard>
    );
  }
}

export const mapStateToProps = createSelector(
  [getPhoto, getName],
  photo => ({
    name,
    photo
  })
);

export const UnstyledAvatarCard = connect(mapStateToProps)(
  UnconnectedAvatarCard
);

export const AvatarCard = withStyles(styles)(UnstyledAvatarCard);
