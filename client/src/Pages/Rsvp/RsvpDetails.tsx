import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { DetailsUpdates } from '../../common';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import defaultProfile from '../../profiles/default_profile.jpg';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import {
  getAddress,
  getDietaryRestrictions,
  getFavoriteDanceSong,
  getInvitedRehearsal,
  getName,
  getPhoto,
  getRelationshipsCount,
  getUserId,
  getWeddingRsvp,
} from '../../store/selectors/user';
import { State } from '../../store/stateDefinition';
import { CantMakeItCard } from './CantMakeItCard';
import { ImGoingCard } from './ImGoingCard';

const styles = createStyles({
  help: {
    display: 'flex',
    justifyContent: 'center',
    margin: 8
  }
});

export interface RsvpDetailsStateProps {
  userId?: string;
  weddingRsvpDetails?: boolean;
  favoriteDanceSong?: string;
  address?: string;
  dietaryRestrictions?: string;
  name?: string;
  photo?: string;
  next: string;
}

export interface RsvpDetailsDispatchProps {
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetails;
}

export interface RsvpDetailsParentProps extends WithStyles<typeof styles> {}

export type RsvpDetailsProps = RsvpDetailsStateProps &
  RsvpDetailsDispatchProps &
  RsvpDetailsParentProps;

export class UnstyledRsvpDetails extends React.Component<RsvpDetailsProps> {
  constructor(props: RsvpDetailsProps) {
    super(props);
  }

  public update = (value: DetailsUpdates) => {
    const { updateDetails: update, userId } = this.props;
    if (userId) {
      update({
        body: { ...value, userId },
        params: {}
      });
    }
  };

  public render() {
    const {
      changeDetails: change,
      favoriteDanceSong,
      address,
      weddingRsvpDetails,
      dietaryRestrictions,
      photo,
      name,
      next
    } = this.props;
    return (
      <ColumnLayout>
        {weddingRsvpDetails ? (
          <ImGoingCard
            name={name}
            photo={
              photo ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}` : defaultProfile
            }
            address={address}
            changeDetails={change}
            dietaryRestrictions={dietaryRestrictions}
            favoriteDanceSong={favoriteDanceSong}
            updateDetails={this.update}
          />
        ) : (
          <CantMakeItCard
            name={name}
            photo={photo && `${REACT_APP_PICTURE_ENDPOINT}/${photo}`}
            changeDetails={change}
            updateDetails={this.update}
            address={address}
          />
        )}
        <Breadcrumbs activeStep={1} />
        <ContinueBar
          back='/rsvp'
          next={next}
          disableNext={!address ? 'Enter address to continue' : undefined}
        />
      </ColumnLayout>
    );
  }
}

export const UnconnectedRsvpDetails = withStyles(styles)(UnstyledRsvpDetails);

export const nextSelector = createSelector(
  [getInvitedRehearsal, getRelationshipsCount, getWeddingRsvp],
  (invitedRehearsal, relationshipsCount, weddingRsvp) => {
    if (invitedRehearsal && weddingRsvp) {
      return '/rsvp/rehearsal/';
    }
    if (relationshipsCount > 0) {
      return '/rsvp/u/0';
    }
    return '/rsvp/review';
  }
);

export const mapStateToProps = (state: State) =>
  createSelector(
    [
      getWeddingRsvp,
      getUserId,
      getFavoriteDanceSong,
      getAddress,
      getDietaryRestrictions,
      getName,
      getPhoto
    ],
    (
      weddingRsvpDetails,
      userId,
      favoriteDanceSong,
      address,
      dietaryRestrictions,
      name,
      photo
    ) => ({
      address,
      dietaryRestrictions,
      favoriteDanceSong,
      name,
      next: nextSelector(state),
      photo,
      userId,
      weddingRsvpDetails
    })
  )(state);

export const actionCreators = {
  changeDetails,
  updateDetails
};

export const RsvpDetails = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpDetails);
