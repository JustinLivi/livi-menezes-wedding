import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { forEach, range } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { DetailsUpdates } from '../../common';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import defaultProfile from '../../profiles/default_profile.jpg';
import { changeDetailsRelation, updateDetails } from '../../store/actions/updateDetails';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipAddress,
  getRelationshipDietaryRestrictions,
  getRelationshipFavoriteDanceSong,
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipName,
  getRelationshipPhoto,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { getHasMoreRelations, getInvitedRehearsal } from '../../store/selectors/user';
import { CacheStatus, State } from '../../store/stateDefinition';
import { CantMakeItCard } from './CantMakeItCard';
import { ImGoingCard } from './ImGoingCard';
import { Loading } from './Loading';

const styles = createStyles({
  help: {
    display: 'flex',
    justifyContent: 'center',
    margin: 8
  }
});

export interface RsvpDetailsRelationStateProps {
  activeStep: number;
  userId?: string;
  weddingRsvpDetails?: boolean;
  favoriteDanceSong?: string;
  address?: string;
  dietaryRestrictions?: string;
  next: string;
  username?: string;
  cacheStatus: CacheStatus;
  photo?: string;
}

export interface RsvpDetailsRelationDispatchProps {
  fetchUser: typeof fetchUser;
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetailsRelation;
}

export interface RsvpDetailsRelationStyleProps
  extends WithStyles<typeof styles> {}

export type RsvpDetailsRelationParentProps = RsvpDetailsRelationStyleProps &
  RelationIdRouteProps;

export type RsvpDetailsRelationProps = RsvpDetailsRelationStateProps &
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
      activeStep,
      favoriteDanceSong,
      address,
      cacheStatus,
      weddingRsvpDetails,
      dietaryRestrictions,
      next,
      username,
      photo,
      classes: { help }
    } = this.props;
    const back = `/rsvp/u/${this.relationId}`;
    if (cacheStatus === CacheStatus.ERRORED) {
      return <Redirect to={`/rsvp/u/${this.relationId}`} />;
    }
    return (
      <ColumnLayout>
        {cacheStatus === CacheStatus.BEHIND ||
        cacheStatus === CacheStatus.FETCHING ? (
          <Loading />
        ) : (
          <React.Fragment>
            {weddingRsvpDetails ? (
              <ImGoingCard
                photo={
                  photo
                    ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}`
                    : defaultProfile
                }
                username={username}
                address={address}
                changeDetails={this.change}
                dietaryRestrictions={dietaryRestrictions}
                favoriteDanceSong={favoriteDanceSong}
                updateDetails={this.update}
              />
            ) : (
              <CantMakeItCard
                photo={
                  photo
                    ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}`
                    : defaultProfile
                }
                username={username}
                changeDetails={this.change}
                updateDetails={this.update}
                address={address}
              />
            )}
            <Breadcrumbs activeStep={activeStep} />
            <ContinueBar
              back={back}
              next={next}
              nextHelp={!address ? 'skip' : 'next'}
            />
          </React.Fragment>
        )}
      </ColumnLayout>
    );
  }
}

export const UnconnectedRsvpDetailsRelation = withStyles(styles)(
  UnstyledRsvpDetailsRelation
);

const activeStepSelector = (state: State, props: RelationIdRouteProps) =>
  createSelector(
    [getInvitedRehearsal],
    invitedRehearsal => {
      let activeStep = 3;
      const relationId = extractRelationId(props);
      activeStep += relationId * 2;
      if (invitedRehearsal) {
        activeStep += 1;
      }
      forEach(range(relationId), index => {
        const relationInvitedRehearsal = getRelationshipInvitedRehearsal(
          state,
          {
            match: {
              ...props.match,
              params: {
                relationId: `${index}`
              }
            }
          }
        );
        if (relationInvitedRehearsal) {
          activeStep += 1;
        }
      });
      return activeStep;
    }
  )(state);

export const nextSelector = (
  state: State,
  props: RsvpDetailsRelationParentProps
) =>
  createSelector(
    [getRelationshipInvitedRehearsal, getHasMoreRelations, getRelationshipRsvp],
    (invitedRehearsal, hasMoreRelations, weddingRsvp) => {
      if (invitedRehearsal && weddingRsvp) {
        return `/rsvp/rehearsal/${extractRelationId(props)}`;
      }
      if (hasMoreRelations) {
        return `/rsvp/u/${extractRelationId(props) + 1}`;
      }
      return '/rsvp/review';
    }
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpDetailsRelationParentProps
) =>
  createSelector(
    [
      getRelationshipsCacheStatus,
      getRelationshipRsvp,
      getRelationshipId,
      getRelationshipFavoriteDanceSong,
      getRelationshipAddress,
      getRelationshipDietaryRestrictions,
      getRelationshipName,
      getRelationshipPhoto
    ],
    (
      cacheStatus,
      weddingRsvpDetails,
      userId,
      favoriteDanceSong,
      address,
      dietaryRestrictions,
      username,
      photo
    ) => ({
      activeStep: activeStepSelector(state, props),
      address,
      cacheStatus,
      dietaryRestrictions,
      favoriteDanceSong,
      next: nextSelector(state, props),
      photo,
      userId,
      username,
      weddingRsvpDetails
    })
  )(state, props);

export const actionCreators = {
  changeDetails: changeDetailsRelation,
  fetchUser,
  updateDetails
};

export const RsvpDetailsRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpDetailsRelation);
