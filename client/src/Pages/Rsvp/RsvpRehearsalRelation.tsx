import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { RsvpRehearsalRelationBar } from '../../ButtonBar/RsvpRehearsalRelationBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipName,
  getRelationshipPhoto,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { CacheStatus } from '../../store/stateDefinition';

export interface RsvpRehearsalRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  name?: string;
  photo?: string;
}

export interface RsvpRehearsalRelationDispatchProps {
  fetchUser: typeof fetchUser;
}

export type RsvpRehearsalRelationProps = RsvpRehearsalRelationStateProps &
  RsvpRehearsalRelationDispatchProps &
  RelationIdRouteProps;

export class UnconnectedRsvpRehearsalRelation extends React.Component<
  RsvpRehearsalRelationProps
> {
  constructor(props: RsvpRehearsalRelationProps) {
    super(props);
  }

  public componentDidMount() {
    const { cacheStatus, fetchUser: fetch, userId } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      fetch({ userId, relationshipIndex: extractRelationId(this.props) });
    }
  }

  public render() {
    const { name, photo, match: matched } = this.props;
    return (
      <ColumnLayout>
        <ProfileCard
          image={
            photo ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}` : justinMarisa
          }
          title={name ? `RSVP for Rehearsal Dinner` : 'loading...'}
          blurb={`Is ${name} attending the Rehearsal Dinner?`}
        />
        <RsvpRehearsalRelationBar match={matched} />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [
    getRelationshipsCacheStatus,
    getRelationshipId,
    getRelationshipName,
    getRelationshipPhoto
  ],
  (cacheStatus, userId, name, photo) => ({
    cacheStatus,
    name,
    photo,
    userId
  })
);

export const actionCreators = {
  fetchUser
};

export const RsvpRehearsalRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalRelation);
