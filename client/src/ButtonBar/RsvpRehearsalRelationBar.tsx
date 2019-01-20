import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { rsvpRehearsal } from '../store/actions/rsvpRehearsal';
import { extractRelationId } from '../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipRsvpRehearsal,
  getRelationshipsCacheStatus,
} from '../store/selectors/relationships';
import { getHasMoreRelations } from '../store/selectors/user';
import { CacheStatus, State } from '../store/stateDefinition';
import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details, DetailsIcons } from './Details';
import { ImGoing } from './ImGoing';

const styles = createStyles({
  buttonBar: {
    flexGrow: 0
  },
  root: {
    alignItems: 'center',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'center',
    margin: theme.spacing.unit
  }
});

export interface RsvpRehearsalRelationBarStateProps {
  next: string;
  disableCantMakeIt: boolean;
  disableImGoing: boolean;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpRehearsalRelationBarDetailsProps {
  rsvpRehearsal: typeof rsvpRehearsal;
}

export interface RsvpRehearsalRelationBarParentProps
  extends WithStyles<typeof styles> {
  match: match<{ relationId: string }>;
}

export type RsvpRehearsalRelationBarProps = RsvpRehearsalRelationBarStateProps &
  RsvpRehearsalRelationBarDetailsProps &
  RsvpRehearsalRelationBarParentProps;

export class UnconnectedRsvpRehearsalRelationBar extends React.Component<
  RsvpRehearsalRelationBarProps
> {
  constructor(props: RsvpRehearsalRelationBarProps) {
    super(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const {
      rsvpRehearsal: rsvp,
      userId,
      match: {
        params: { relationId }
      }
    } = this.props;
    if (userId) {
      rsvp({
        body: { userId, rsvp: response },
        params: { relationshipIndex: parseInt(relationId, 10) }
      });
    }
  };

  public render() {
    const {
      next,
      disableCantMakeIt,
      disableImGoing,
      weddingRsvp,
      match: {
        params: { relationId }
      },
      classes: { root, buttonBar }
    } = this.props;
    const relationIndex = parseInt(relationId, 10);
    return (
      <div className={root}>
        <div className={buttonBar}>
          <CantMakeIt
            onClick={this.handleClick(false)}
            disabled={disableCantMakeIt}
            selected={weddingRsvp === false}
          />
          <Details
            to={`/rsvp/details/${relationIndex}`}
            iconType={DetailsIcons.backArrow}
            help='back'
          />
          <Details
            to={next}
            iconType={DetailsIcons.nextArrow}
            help={weddingRsvp === undefined ? 'skip' : 'next'}
          />
          <ImGoing
            help="they're going!"
            selected={weddingRsvp}
            onClick={this.handleClick(true)}
            disabled={disableImGoing}
          />
        </div>
      </div>
    );
  }
}

export const disableImGoingSelector = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
) =>
  createSelector(
    [getRelationshipsCacheStatus, getRelationshipRsvpRehearsal],
    (cacheStatus, weddingRsvp) =>
      cacheStatus === CacheStatus.FETCHING ||
      cacheStatus === CacheStatus.PERSISTING ||
      weddingRsvp === true
  )(state, props);

export const disableCantMakeItSelector = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
) =>
  createSelector(
    [getRelationshipsCacheStatus, getRelationshipRsvpRehearsal],
    (cacheStatus, weddingRsvp) =>
      cacheStatus === CacheStatus.FETCHING ||
      cacheStatus === CacheStatus.PERSISTING ||
      weddingRsvp === false
  )(state, props);

export const nextSelector = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
): string =>
  createSelector(
    [getRelationshipRsvpRehearsal, getHasMoreRelations],
    (weddingRsvp, hasMoreRelations) =>
      hasMoreRelations && weddingRsvp === undefined
        ? `/rsvp/u/${extractRelationId(props) + 1}`
        : '/rsvp/complete'
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
) =>
  createSelector(
    [getRelationshipRsvpRehearsal, getRelationshipId],
    (weddingRsvp, userId) => ({
      disableCantMakeIt: disableCantMakeItSelector(state, props),
      disableImGoing: disableImGoingSelector(state, props),
      next: nextSelector(state, props),
      userId,
      weddingRsvp
    })
  )(state, props);

export const actionCreators = {
  rsvpRehearsal
};

export const UnstyledRsvpRehearsalRelationBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalRelationBar);

export const RsvpRehearsalRelationBar = withStyles(styles)(
  UnstyledRsvpRehearsalRelationBar
);
