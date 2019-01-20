import { forEach, range } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { RsvpRelationBar } from '../../ButtonBar/RsvpRelationBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipName,
  getRelationshipPhoto,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { getInvitedRehearsal } from '../../store/selectors/user';
import { CacheStatus, State } from '../../store/stateDefinition';
import { Loading } from './Loading';

export interface RsvpRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  name?: string;
  photo?: string;
  activeStep: number;
}

export interface RsvpRelationDispatchProps {
  fetchUser: typeof fetchUser;
}

export type RsvpRelationProps = RsvpRelationStateProps &
  RsvpRelationDispatchProps &
  RelationIdRouteProps;

export class UnconnectedRsvpRelation extends React.Component<
  RsvpRelationProps
> {
  private relationId: number;

  constructor(props: RsvpRelationProps) {
    super(props);
    this.relationId = extractRelationId(props);
  }

  public componentDidMount() {
    const { cacheStatus, fetchUser: fetch, userId } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      fetch({ userId, relationshipIndex: this.relationId });
    }
  }

  public render() {
    const { name, photo, match: matched, cacheStatus, activeStep } = this.props;
    return (
      <ColumnLayout>
        {cacheStatus === CacheStatus.UP_TO_DATE ||
        cacheStatus === CacheStatus.PERSISTING ? (
          <React.Fragment>
            <ProfileCard
              image={
                photo ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}` : justinMarisa
              }
              title={name ? `RSVP for ${name}` : 'loading...'}
              blurb={`Is ${name} attending the ceremony and reception?`}
            />
            <Breadcrumbs activeStep={activeStep} />
            <RsvpRelationBar match={matched} />
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </ColumnLayout>
    );
  }
}

const activeStepSelector = (state: State, props: RelationIdRouteProps) =>
  createSelector(
    [getInvitedRehearsal],
    invitedRehearsal => {
      let activeStep = 2;
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

export const mapStateToProps = (state: State, props: RelationIdRouteProps) =>
  createSelector(
    [
      getRelationshipsCacheStatus,
      getRelationshipId,
      getRelationshipName,
      getRelationshipPhoto
    ],
    (cacheStatus, userId, name, photo) => ({
      activeStep: activeStepSelector(state, props),
      cacheStatus,
      name,
      photo,
      userId
    })
  )(state, props);

export const actionCreators = {
  fetchUser
};

export const RsvpRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelation);
