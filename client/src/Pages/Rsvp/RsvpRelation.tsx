import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { RsvpContinueBar } from '../../ButtonBar/RsvpContinueBar';
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
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { CacheStatus } from '../../store/stateDefinition';

export interface RsvpRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  weddingRsvp?: boolean;
  name?: string;
  photo?: string;
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
  constructor(props: RsvpRelationProps) {
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
          title={name ? `RSVP for ${name}` : 'loading...'}
          blurb={`Is ${name} attending the ceremony and reception?`}
        />
        <RsvpContinueBar match={matched} />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [
    getRelationshipsCacheStatus,
    getRelationshipRsvp,
    getRelationshipId,
    getRelationshipName,
    getRelationshipPhoto
  ],
  (cacheStatus, weddingRsvp, userId, name, photo) => ({
    cacheStatus,
    name,
    photo,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  fetchUser
};

export const RsvpRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelation);
