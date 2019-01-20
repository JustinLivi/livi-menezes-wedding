import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Details, DetailsIcons } from '../../ButtonBar/Details';
import { DetailsUpdates } from '../../common';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { changeDetailsRelation, updateDetails } from '../../store/actions/updateDetails';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipAddress,
  getRelationshipDietaryRestrictions,
  getRelationshipFavoriteDanceSong,
  getRelationshipId,
  getRelationshipName,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { getHasMoreRelations } from '../../store/selectors/user';
import { CacheStatus } from '../../store/stateDefinition';
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
  hasMoreRelations?: true;
  username?: string;
  cacheStatus: CacheStatus;
}

export interface RsvpDetailsRelationDispatchProps {
  fetchUser: typeof fetchUser;
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetailsRelation;
}

export interface RsvpDetailsRelationParentProps
  extends WithStyles<typeof styles> {}

export type RsvpDetailsRelationProps = RsvpDetailsRelationStateProps &
  RelationIdRouteProps &
  RsvpDetailsRelationDispatchProps &
  RsvpDetailsRelationParentProps;

export class UnstyledRsvpDetailsRelation extends React.Component<
  RsvpDetailsRelationProps
> {
  private relationId: number;

  constructor(props: RsvpDetailsRelationProps) {
    super(props);
    this.relationId = extractRelationId(this.props);
  }

  public componentDidMount() {
    const { cacheStatus, fetchUser: fetch, userId } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      fetch({ userId, relationshipIndex: this.relationId });
    }
  }

  public update = (value: DetailsUpdates) => {
    const { updateDetails: update, userId } = this.props;
    if (userId) {
      update({
        body: { ...value, userId },
        params: { relationshipIndex: this.relationId }
      });
    }
  };

  public change = (updates: DetailsUpdates) => {
    const { changeDetails: change } = this.props;
    change({
      relationIndex: this.relationId,
      updates
    });
  };

  public render() {
    const {
      favoriteDanceSong,
      address,
      weddingRsvpDetails,
      dietaryRestrictions,
      hasMoreRelations,
      username,
      classes: { help }
    } = this.props;
    const back = `/rsvp/u/${this.relationId}`;
    const next = `/rsvp/u/${this.relationId + 1}`;
    return (
      <ColumnLayout>
        {weddingRsvpDetails ? (
          <ImGoingCard
            username={username}
            address={address}
            changeDetails={this.change}
            dietaryRestrictions={dietaryRestrictions}
            favoriteDanceSong={favoriteDanceSong}
            updateDetails={this.update}
          />
        ) : (
          <CantMakeItCard
            changeDetails={this.change}
            updateDetails={this.update}
            address={address}
          />
        )}
        {address && hasMoreRelations && (
          <div className={help}>Continue to RSVP for friends and family</div>
        )}
        {address && hasMoreRelations ? (
          <ContinueBar back={back} next={next} />
        ) : (
          <div className={help}>
            <Details to={back} iconType={DetailsIcons.backArrow} />
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
    getRelationshipsCacheStatus,
    getRelationshipRsvp,
    getRelationshipId,
    getRelationshipFavoriteDanceSong,
    getRelationshipAddress,
    getRelationshipDietaryRestrictions,
    getHasMoreRelations,
    getRelationshipName
  ],
  (
    cacheStatus,
    weddingRsvpDetails,
    userId,
    favoriteDanceSong,
    address,
    dietaryRestrictions,
    hasMoreRelations,
    username
  ) => ({
    address,
    cacheStatus,
    dietaryRestrictions,
    favoriteDanceSong,
    hasMoreRelations,
    userId,
    username,
    weddingRsvpDetails
  })
);

export const actionCreators = {
  changeDetails: changeDetailsRelation,
  fetchUser,
  updateDetails
};

export const RsvpDetailsRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpDetailsRelation);
