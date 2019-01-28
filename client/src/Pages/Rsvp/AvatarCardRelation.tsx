import { Avatar, CardContent, createStyles, Grid, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { StandardCard } from '../../Components/StandardCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { getRelationshipName, getRelationshipPhoto } from '../../store/selectors/relationships';

const styles = createStyles({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  content: {
    paddingTop: 25
  }
});

export interface AvatarCardRelationStateProps {
  photo?: string;
  name?: string;
}

export interface AvatarCardRelationParentProps
  extends WithStyles<typeof styles> {
  swipe?: boolean;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export type AvatarCardRelationProps = AvatarCardRelationParentProps &
  AvatarCardRelationStateProps;

export class UnconnectedAvatarCardRelation extends React.Component<
  AvatarCardRelationProps
> {
  constructor(props: AvatarCardRelationProps) {
    super(props);
  }

  public render() {
    const {
      children,
      classes: { content, avatar },
      photo,
      name,
      swipe,
      swipeRight,
      swipeLeft
    } = this.props;
    return (
      <StandardCard swipe={swipe} swipeLeft={swipeLeft} swipeRight={swipeRight}>
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
  [getRelationshipPhoto, getRelationshipName],
  photo => ({
    name,
    photo
  })
);

export const UnstyledAvatarCardRelation = connect(mapStateToProps)(
  UnconnectedAvatarCardRelation
);

export const AvatarCardRelation = withStyles(styles)(
  UnstyledAvatarCardRelation
);
