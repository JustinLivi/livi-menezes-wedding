import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { forEach, map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { UserData } from '../../common';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { rsvpCeremony } from '../../store/actions/rsvpCeremony';
import { rsvpRehearsal } from '../../store/actions/rsvpRehearsal';
import { fetchUser } from '../../store/actions/user';
import {
  getAllRelationships,
  getRelationshipInvitedRehearsal,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import {
  getInvitedRehearsal,
  getName,
  getPhoto,
  getRehearsalRsvp,
  getRelationships,
  getRelationshipsCount,
  getUserCacheStatus,
  getUserId,
  getWeddingRsvp,
} from '../../store/selectors/user';
import { CacheStatus, State } from '../../store/stateDefinition';
import { ReviewResponse } from './ReviewResponse';

const styles = createStyles({
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  hr: {
    marginBottom: 20,
    marginTop: 20
  },
  standardCard: {
    height: 450,
    maxHeight: 'calc(100vh - 260px)',
    overflow: 'auto',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface CantMakeItCardStateProps {
  allRelationships: UserData[];
  back: string;
  userCacheStatus: CacheStatus;
  relationCacheStatus: CacheStatus;
  relationships?: string[];
  userId?: string;
  weddingRsvp?: boolean;
  invitedRehearsal?: boolean;
  rehearsalRsvp?: boolean;
  name?: string;
  photo?: string;
}

export interface CantMakeItCardDispatchProps {
  fetchUser: typeof fetchUser;
  rsvpCeremony: typeof rsvpCeremony;
  rsvpRehearsal: typeof rsvpRehearsal;
}

export interface CantMakeItCardParentProps extends WithStyles<typeof styles> {}

export type CantMakeItCardProps = CantMakeItCardParentProps &
  CantMakeItCardDispatchProps &
  CantMakeItCardStateProps;

export class UnconnectedRsvpReview extends React.Component<
  CantMakeItCardProps
> {
  constructor(props: CantMakeItCardProps) {
    super(props);
  }

  public componentDidMount() {
    const {
      allRelationships,
      relationships,
      relationCacheStatus,
      fetchUser: shouldFetch,
      userCacheStatus,
      userId
    } = this.props;
    if (userCacheStatus === CacheStatus.BEHIND && userId) {
      shouldFetch({ userId });
    }
    if (
      relationships &&
      relationships.length > 0 &&
      relationCacheStatus !== CacheStatus.FETCHING &&
      relationCacheStatus !== CacheStatus.PERSISTING
    ) {
      forEach(relationships, (relationship, index) => {
        if (!allRelationships[index]) {
          shouldFetch({ userId: relationship, relationshipIndex: index });
        }
      });
    }
  }

  public componentDidUpdate() {
    this.componentDidMount();
  }

  public handleCeremonyClick: (
    response: boolean,
    userId?: string,
    relationshipIndex?: number
  ) => React.MouseEventHandler<HTMLElement> = (
    response,
    userId,
    relationshipIndex
  ) => event => {
    const { rsvpCeremony: rsvp } = this.props;
    if (userId) {
      rsvp({
        body: { userId, rsvp: response },
        params: { relationshipIndex }
      });
    }
  };

  public render() {
    const {
      back,
      weddingRsvp,
      invitedRehearsal,
      rehearsalRsvp,
      photo,
      allRelationships,
      name,
      userId,
      classes: { topName, centered, standardCard, content, hr }
    } = this.props;
    return (
      <ColumnLayout>
        <StandardCard className={standardCard}>
          <CardContent className={content}>
            <Typography
              className={classnames(topName, centered)}
              variant='h6'
              component='p'
            >
              Review Responses
            </Typography>
            <ReviewResponse
              handleCantMakeIt={this.handleCeremonyClick(false, userId)}
              handleImGoing={this.handleCeremonyClick(true, userId)}
              photo={photo}
              name={name}
              attendingRehearsal={rehearsalRsvp}
              rehearsal={!!weddingRsvp && !!invitedRehearsal}
              attendingWedding={weddingRsvp}
            />
            {map(
              allRelationships,
              (
                {
                  profile,
                  name: relationName,
                  attendingRehearsal: relationAttendingRehearsal,
                  rehearsal: relationRehearsal,
                  attendingWedding: relationAttendingWedding
                },
                index
              ) => (
                <React.Fragment key={index}>
                  <hr className={hr} />
                  <ReviewResponse
                    handleCantMakeIt={this.handleCeremonyClick(
                      false,
                      userId,
                      index
                    )}
                    handleImGoing={this.handleCeremonyClick(
                      true,
                      userId,
                      index
                    )}
                    photo={profile ? profile.photo : undefined}
                    name={relationName}
                    attendingRehearsal={relationAttendingRehearsal}
                    rehearsal={
                      !!relationAttendingWedding && !!relationRehearsal
                    }
                    attendingWedding={relationAttendingWedding}
                  />
                </React.Fragment>
              )
            )}
          </CardContent>
        </StandardCard>
        <Breadcrumbs activeStep={-1} />
        <ContinueBar back={back} next='/rsvp/complete' />
      </ColumnLayout>
    );
  }
}

export const backSelector = (state: State) =>
  createSelector(
    [getInvitedRehearsal, getRelationshipsCount, getWeddingRsvp],
    (invitedRehearsal, relationshipsCount, weddingRsvp) => {
      if (relationshipsCount === 0) {
        if (invitedRehearsal && weddingRsvp) {
          return '/rsvp/rehearsal/';
        }
        return '/rsvp/details/';
      }
      const prevRelation = relationshipsCount - 1;
      const prevParams = {
        match: {
          isExact: true,
          params: { relationId: `${prevRelation}` },
          path: '',
          url: ''
        }
      };
      if (
        getRelationshipInvitedRehearsal(state, prevParams) &&
        getRelationshipRsvp(state, prevParams)
      ) {
        return `/rsvp/rehearsal/${prevRelation}`;
      }
      return `/rsvp/details/${prevRelation}`;
    }
  )(state);

export const mapStateToProps = (state: State) =>
  createSelector(
    [
      getRelationshipsCacheStatus,
      getAllRelationships,
      getUserId,
      getUserCacheStatus,
      getRelationships,
      getWeddingRsvp,
      getInvitedRehearsal,
      getRehearsalRsvp,
      getName,
      getPhoto
    ],
    (
      relationCacheStatus,
      allRelationships,
      userId,
      userCacheStatus,
      relationships,
      weddingRsvp,
      invitedRehearsal,
      rehearsalRsvp,
      name,
      photo
    ) => ({
      allRelationships,
      back: backSelector(state),
      invitedRehearsal,
      name,
      photo,
      rehearsalRsvp,
      relationCacheStatus,
      relationships,
      userCacheStatus,
      userId,
      weddingRsvp
    })
  )(state);

export const actionCreators = {
  fetchUser,
  rsvpCeremony,
  rsvpRehearsal
};

export const UnstyledRsvpReview = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpReview);

export const RsvpReview = withStyles(styles)(UnstyledRsvpReview);
