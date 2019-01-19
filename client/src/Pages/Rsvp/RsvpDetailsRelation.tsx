import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Details, DetailsIcons } from '../../ButtonBar/Details';
import { DetailsUpdates } from '../../common';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import {
  getAddress,
  getDietaryRestrictions,
  getFavoriteDanceSong,
  getRelationships,
  getUserId,
  getWeddingRsvp,
} from '../../store/selectors';
import { CantMakeItCard } from './CantMakeItCard';
import { ImGoingCard } from './ImGoingCard';

const styles = createStyles({
  help: {
    display: 'flex',
    justifyContent: 'center',
    margin: 8
  }
});

export interface RsvpDetailsRelationStateProps {
  userId?: string;
  weddingRsvpDetails?: boolean;
  favoriteDanceSong?: string;
  address?: string;
  dietaryRestrictions?: string;
  relationships?: string[];
}

export interface RsvpDetailsRelationDispatchProps {
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetails;
}

export interface RsvpDetailsRelationParentProps
  extends WithStyles<typeof styles> {}

export type RsvpDetailsRelationProps = RsvpDetailsRelationStateProps &
  RsvpDetailsRelationDispatchProps &
  RsvpDetailsRelationParentProps;

export class UnstyledRsvpDetailsRelation extends React.Component<
  RsvpDetailsRelationProps
> {
  constructor(props: RsvpDetailsRelationProps) {
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
      changeDetails: change,
      favoriteDanceSong,
      address,
      weddingRsvpDetails,
      dietaryRestrictions,
      relationships,
      classes: { help }
    } = this.props;
    return (
      <ColumnLayout>
        {weddingRsvpDetails ? (
          <ImGoingCard
            address={address}
            changeDetails={change}
            dietaryRestrictions={dietaryRestrictions}
            favoriteDanceSong={favoriteDanceSong}
            updateDetails={this.update}
          />
        ) : (
          <CantMakeItCard
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

export const UnconnectedRsvpDetailsRelation = withStyles(styles)(
  UnstyledRsvpDetailsRelation
);

export const mapStateToProps = createSelector(
  [
    getWeddingRsvp,
    getUserId,
    getFavoriteDanceSong,
    getAddress,
    getDietaryRestrictions,
    getRelationships
  ],
  (
    weddingRsvpDetails,
    userId,
    favoriteDanceSong,
    address,
    dietaryRestrictions,
    relationships
  ) => ({
    address,
    dietaryRestrictions,
    favoriteDanceSong,
    relationships,
    userId,
    weddingRsvpDetails
  })
);

export const actionCreators = {
  changeDetails,
  updateDetails
};

export const RsvpDetailsRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpDetailsRelation);
