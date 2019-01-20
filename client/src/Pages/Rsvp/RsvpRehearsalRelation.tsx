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
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { fetchUser } from '../../store/actions/user';
import { extractRelationId, RelationIdRouteProps } from '../../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipName,
  getRelationshipsCacheStatus,
} from '../../store/selectors/relationships';
import { getInvitedRehearsal } from '../../store/selectors/user';
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
  standardCard: {
    overflow: 'initial',
    position: 'relative'
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
}

export interface RsvpRehearsalRelationDispatchProps {
  fetchUser: typeof fetchUser;
}

export type RsvpRehearsalRelationParentProps = WithStyles<typeof styles> &
  RelationIdRouteProps;

export type RsvpRehearsalRelationProps = RsvpRehearsalRelationStateProps &
  RsvpRehearsalRelationDispatchProps &
  RsvpRehearsalRelationParentProps;

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
    const {
      name,
      match: matched,
      cacheStatus,
      activeStep,
      classes: { topName, centered }
    } = this.props;
    return (
      <ColumnLayout>
        {cacheStatus === CacheStatus.UP_TO_DATE ||
        cacheStatus === CacheStatus.PERSISTING ? (
          <React.Fragment>
            <AvatarCardRelation {...{ match: matched }}>
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
    [getRelationshipsCacheStatus, getRelationshipId, getRelationshipName],
    (cacheStatus, userId, name) => ({
      activeStep: activeStepSelector(state, props),
      cacheStatus,
      name,
      userId
    })
  )(state, props);

export const actionCreators = {
  fetchUser
};

export const UnstyledRsvpRehearsalRelation = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalRelation);

export const RsvpRehearsalRelation = withStyles(styles)(
  UnstyledRsvpRehearsalRelation
);
