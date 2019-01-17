import { Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { DetailsUpdates } from '../../common';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import { fetchUser } from '../../store/actions/user';
import {
  getRelationshipId,
  getRelationshipName,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../../store/selectors';
import { CacheStatus } from '../../store/stateDefinition';

export interface RsvpRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  weddingRsvp?: boolean;
  name?: string;
}

export interface RsvpRelationDispatchProps {
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetails;
  fetchUser: typeof fetchUser;
}

export interface RsvpRelationParentProps {
  match: match<{ relationId: string }>;
}

export type RsvpRelationProps = RsvpRelationStateProps &
  RsvpRelationDispatchProps &
  RsvpRelationParentProps;

export class UnconnectedRsvpRelation extends React.Component<
  RsvpRelationProps
> {
  constructor(props: RsvpRelationProps) {
    super(props);
  }

  public componentDidMount() {
    const {
      cacheStatus,
      fetchUser: fetch,
      userId,
      match: {
        params: { relationId }
      }
    } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      fetch({ userId, relationshipIndex: parseInt(relationId, 10) });
    }
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
    const { weddingRsvp, name } = this.props;
    return (
      <ColumnLayout>
        <ProfileCard
          image={justinMarisa}
          title={name || 'loading...'}
          blurb={
            <React.Fragment>
              <Typography component='p'>
                Sunday, October 13, 2019 at 4pm
              </Typography>
              <Typography component='p'>Baltimore, MD</Typography>
            </React.Fragment>
          }
        />
        <RsvpBar
          detailsIconType={
            weddingRsvp === undefined ? undefined : DetailsIcons.nextArrow
          }
          hideHelp
          toDetails={weddingRsvp === undefined ? '/details' : '/rsvp/details'}
        />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [
    getRelationshipsCacheStatus,
    getRelationshipRsvp,
    getRelationshipId,
    getRelationshipName
  ],
  (cacheStatus, weddingRsvp, userId, name) => ({
    cacheStatus,
    name,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  changeDetails,
  fetchUser,
  updateDetails
};

export const RsvpRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelation);
