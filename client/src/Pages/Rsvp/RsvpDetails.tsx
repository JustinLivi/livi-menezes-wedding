import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Details, DetailsIcons } from '../../ButtonBar/Details';
import { DetailsUpdates } from '../../common';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import {
  getAddress,
  getDietaryRestrictions,
  getFavoriteDanceSong,
  getName,
  getPhoto,
  getRelationships,
  getUserId,
  getWeddingRsvp,
} from '../../store/selectors/user';
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
  relationships?: string[];
  name?: string;
  photo?: string;
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
      relationships,
      photo,
      name,
      classes: { help }
    } = this.props;
    return (
      <ColumnLayout>
        {weddingRsvpDetails ? (
          <ImGoingCard
            name={name}
            photo={photo && `${REACT_APP_PICTURE_ENDPOINT}/${photo}`}
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
        {address && (
          <div className={help}>Continue to RSVP for friends and family</div>
        )}
        {address && relationships ? (
          <ContinueBar back='/' next='/rsvp/u/0' />
        ) : (
          <div className={help}>
            <Details to='/' iconType={DetailsIcons.backArrow} />
          </div>
        )}
      </ColumnLayout>
    );
  }
}

export const UnconnectedRsvpDetails = withStyles(styles)(UnstyledRsvpDetails);

export const mapStateToProps = createSelector(
  [
    getWeddingRsvp,
    getUserId,
    getFavoriteDanceSong,
    getAddress,
    getDietaryRestrictions,
    getRelationships,
    getName,
    getPhoto
  ],
  (
    weddingRsvpDetails,
    userId,
    favoriteDanceSong,
    address,
    dietaryRestrictions,
    relationships,
    name,
    photo
  ) => ({
    address,
    dietaryRestrictions,
    favoriteDanceSong,
    name,
    photo,
    relationships,
    userId,
    weddingRsvpDetails
  })
);

export const actionCreators = {
  changeDetails,
  updateDetails
};

export const RsvpDetails = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpDetails);
