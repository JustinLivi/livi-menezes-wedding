import { Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { DetailsUpdates } from '../../common';
import { ProfileCard } from '../../Components/ProfileCard';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import { getAddress, getDietaryRestrictions, getFavoriteDanceSong, getUserId, getWeddingRsvp } from '../../store/selectors';
import { CantMakeItCard } from './CantMakeItCard';
import { ImGoingCard } from './ImGoingCard';

export interface RsvpCardStateProps {
  userId?: string;
  weddingRsvp?: boolean;
  favoriteDanceSong?: string;
  address?: string;
  dietaryRestrictions?: string;
}

export interface RsvpCardDispatchProps {
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetails;
}

export type RsvpCardProps = RsvpCardStateProps & RsvpCardDispatchProps;

export class UnconnectedRsvpCard extends React.Component<RsvpCardProps> {
  constructor(props: RsvpCardProps) {
    super(props);
  }

  public update = (value: DetailsUpdates) => {
    const { updateDetails: update, userId } = this.props;
    if (userId) {
      update({
        ...value,
        userId
      });
    }
  };

  public render() {
    const {
      updateDetails: update,
      changeDetails: change,
      favoriteDanceSong,
      address,
      weddingRsvp,
      dietaryRestrictions
    } = this.props;
    if (weddingRsvp === false) {
      return (
        <CantMakeItCard
          changeDetails={change}
          updateDetails={this.update}
          address={address}
        />
      );
    }
    if (weddingRsvp === true) {
      return (
        <ImGoingCard
          address={address}
          changeDetails={change}
          dietaryRestrictions={dietaryRestrictions}
          favoriteDanceSong={favoriteDanceSong}
          updateDetails={this.update}
        />
      );
    }
    return (
      <ProfileCard
        image={justinMarisa}
        title="Justin and Marisa's Wedding"
        blurb={
          <React.Fragment>
            <Typography component='p'>
              Sunday, October 13, 2019 at 4pm
            </Typography>
            <Typography component='p'>Baltimore, MD</Typography>
          </React.Fragment>
        }
      />
    );
  }
}

export const mapStateToProps = createSelector(
  [
    getWeddingRsvp,
    getUserId,
    getFavoriteDanceSong,
    getAddress,
    getDietaryRestrictions
  ],
  (weddingRsvp, userId, favoriteDanceSong, address, dietaryRestrictions) => ({
    address,
    dietaryRestrictions,
    favoriteDanceSong,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  changeDetails,
  updateDetails
};

export const RsvpCard = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpCard);
