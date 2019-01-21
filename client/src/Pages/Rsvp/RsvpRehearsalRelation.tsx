import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { forEach, range } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { RsvpRehearsalRelationBar } from '../../ButtonBar/RsvpRehearsalRelationBar';
import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { ItsaMatch } from '../../Components/ItsaMatch';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { rsvpRehearsal } from '../../store/actions/rsvpRehearsal';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipName,
  getRelationshipPhoto,
  getRelationshipRsvpRehearsal,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { getInvitedRehearsal, getRedirect } from '../../store/selectors/user';
import { CacheStatus, State } from '../../store/stateDefinition';
import { AvatarCardRelation } from './AvatarCardRelation';
import { Loading } from './Loading';

const styles = createStyles({
  ...buttonBarStyles,
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  topName: {
    marginBottom: 15
  }
});

export interface RsvpRehearsalRelationStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  name?: string;
  activeStep: number;
  photo?: string;
  redirect?: string;
  rehearsalRsvp?: boolean;
}

export interface RsvpRehearsalRelationDispatchProps {
  fetchUser: typeof fetchUser;
  rsvpRehearsal: typeof rsvpRehearsal;
}

export type RsvpRehearsalRelationParentProps = WithStyles<typeof styles> &
  RelationIdRouteProps;

export type RsvpRehearsalRelationProps = RsvpRehearsalRelationStateProps &
  RsvpRehearsalRelationDispatchProps &
  RsvpRehearsalRelationParentProps;

export class UnconnectedRsvpRehearsalRelation extends React.Component<
  RsvpRehearsalRelationProps
> {
  private relationId: number;
  constructor(props: RsvpRehearsalRelationProps) {
    super(props);
    this.relationId = extractRelationId(this.props);
  }

  public rsvp: (response: boolean) => () => void = response => () => {
    const { rsvpRehearsal: shouldRsvp, userId } = this.props;
    if (userId) {
      shouldRsvp({
        body: { userId, rsvp: response },
        params: { relationshipIndex: this.relationId }
      });
    }
  };

  public componentDidMount() {
    const { cacheStatus, fetchUser: fetch, userId } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      fetch({ userId, relationshipIndex: this.relationId });
    }
  }

  public render() {
    const {
      name,
      match: matched,
      cacheStatus,
      activeStep,
      rehearsalRsvp,
      redirect,
      photo,
      classes: { topName, centered }
    } = this.props;
    return (
      <ColumnLayout>
        {cacheStatus === CacheStatus.UP_TO_DATE ||
        cacheStatus === CacheStatus.PERSISTING ? (
          <React.Fragment>
            {rehearsalRsvp === true && redirect ? (
              <ItsaMatch
                leftPhoto={`${REACT_APP_PICTURE_ENDPOINT}/${photo}`}
                name={name}
                rightPhoto={justinMarisa}
                message={`${name} is going to the wedding rehearsal!`}
                description="Justin and Marisa's Wedding Rehearsal"
              />
            ) : (
              undefined
            )}
            <AvatarCardRelation
              swipe
              swipeLeft={this.rsvp(false)}
              swipeRight={this.rsvp(true)}
              {...{ match: matched }}
            >
              <Typography
                className={classnames(topName, centered)}
                variant='h6'
                component='p'
              >
                RSVP For Rehearsal
              </Typography>
              <Typography className={topName} component='p'>
                {name
                  ? `${name} is invited to our rehearsal dinner!`
                  : 'loading...'}
              </Typography>
              <Typography className={topName} component='p'>
                Details TBD
              </Typography>
            </AvatarCardRelation>
            <Breadcrumbs activeStep={activeStep} />
            <RsvpRehearsalRelationBar match={matched} />
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </ColumnLayout>
    );
  }
}

const activeStepSelector = (
  state: State,
  props: RsvpRehearsalRelationParentProps
) =>
  createSelector(
    [getInvitedRehearsal],
    invitedRehearsal => {
      let activeStep = 4;
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

export const mapStateToProps = (
  state: State,
  props: RsvpRehearsalRelationParentProps
) =>
  createSelector(
    [
      getRelationshipsCacheStatus,
      getRelationshipId,
      getRelationshipName,
      getRelationshipRsvpRehearsal,
      getRedirect,
      getRelationshipPhoto
    ],
    (cacheStatus, userId, name, rehearsalRsvp, redirect, photo) => ({
      activeStep: activeStepSelector(state, props),
      cacheStatus,
      name,
      photo,
      redirect,
      rehearsalRsvp,
      userId
    })
  )(state, props);

export const actionCreators = {
  fetchUser,
  rsvpRehearsal
};

export const UnstyledRsvpRehearsalRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalRelation);

export const RsvpRehearsalRelation = withStyles(styles)(
  UnstyledRsvpRehearsalRelation
);
