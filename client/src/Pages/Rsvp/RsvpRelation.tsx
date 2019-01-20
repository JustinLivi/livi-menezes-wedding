import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { RsvpRelationBar } from '../../ButtonBar/RsvpRelationBar';
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
import { Loading } from './Loading';

export interface RsvpRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
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
    const { name, photo, match: matched, cacheStatus } = this.props;
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
            <RsvpRelationBar match={matched} />
          </React.Fragment>
        ) : (
          <Loading />
        )}
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

export const RsvpRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelation);
