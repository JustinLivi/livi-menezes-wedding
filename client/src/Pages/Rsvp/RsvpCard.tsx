import { Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ProfileCard } from '../../Components/ProfileCard';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { updateDetails } from '../../store/actions/updateDetails';
import { getAddress, getFavoriteDanceSong, getUserId, getWeddingRsvp } from '../../store/selectors';
import { CantMakeItCard } from './CantMakeItCard';
import { ImGoingCard } from './ImGoingCard';

export interface RsvpCardStateProps {
  userId?: string;
  weddingRsvp?: boolean;
  favoriteDanceSong?: string;
  address?: string;
}

export interface RsvpCardDispatchProps {
  updateDetails: typeof updateDetails;
}

export type RsvpCardProps = RsvpCardStateProps & RsvpCardDispatchProps;

export class UnconnectedRsvpCard extends React.Component<RsvpCardProps> {
  constructor(props: RsvpCardProps) {
    super(props);
  }

  public update = (prop: 'address' | 'favoriteDanceSong') => (
    value: string
  ) => {
    const { updateDetails: update, userId } = this.props;
    if (userId) {
      update({
        [prop]: value,
        userId
      });
    }
  };

  public render() {
    const {
      updateDetails: update,
      favoriteDanceSong,
      address,
      weddingRsvp
    } = this.props;
    if (weddingRsvp === false) {
      return (
        <CantMakeItCard
          updateAddress={this.update('address')}
          address={address}
        />
      );
    }
    if (weddingRsvp === true) {
      return (
        <ImGoingCard
          address={address}
          favoriteDanceSong={favoriteDanceSong}
          updateAddress={this.update('address')}
          updateFavoriteDanceSong={this.update('favoriteDanceSong')}
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
  [getWeddingRsvp, getUserId, getFavoriteDanceSong, getAddress],
  (weddingRsvp, userId, favoriteDanceSong, address) => ({
    address,
    favoriteDanceSong,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  updateDetails
};

export const RsvpCard = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpCard);
