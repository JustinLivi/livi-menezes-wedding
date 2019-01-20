import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import { extractRelationId } from '../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../store/selectors/relationships';
import { getHasMoreRelations, getInvitedRehearsal } from '../store/selectors/user';
import { CacheStatus, State } from '../store/stateDefinition';
import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details, DetailsIcons } from './Details';
import { ImGoing } from './ImGoing';

export const buttonBarStyles = createStyles({
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

export interface RsvpRelationBarStateProps {
  displaySkip?: true;
  disableCantMakeIt: boolean;
  disableImGoing: boolean;
  userId?: string;
  weddingRsvp?: boolean;
  back: string;
}

export interface RsvpRelationBarDetailsProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export interface RsvpRelationBarParentProps
  extends WithStyles<typeof buttonBarStyles> {
  match: match<{ relationId: string }>;
}

export type RsvpRelationBarProps = RsvpRelationBarStateProps &
  RsvpRelationBarDetailsProps &
  RsvpRelationBarParentProps;

export class UnconnectedRsvpRelationBar extends React.Component<
  RsvpRelationBarProps
> {
  private relationIndex: number;

  constructor(props: RsvpRelationBarProps) {
    super(props);
    this.relationIndex = extractRelationId(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const { rsvpCeremony: rsvp, userId } = this.props;
    if (userId) {
      rsvp({
        body: { userId, rsvp: response },
        params: { relationshipIndex: this.relationIndex }
      });
    }
  };

  public render() {
    const {
      displaySkip,
      disableCantMakeIt,
      disableImGoing,
      weddingRsvp,
      back,
      classes: { root, buttonBar }
    } = this.props;
    return (
      <div className={root}>
        <div className={buttonBar}>
          <CantMakeIt
            onClick={this.handleClick(false)}
            disabled={disableCantMakeIt}
            selected={weddingRsvp === false}
          />
          <Details to={back} iconType={DetailsIcons.backArrow} help='back' />
          {displaySkip && (
            <Details
              to={
                weddingRsvp === undefined
                  ? `/rsvp/u/${this.relationIndex + 1}`
                  : `/rsvp/details/${this.relationIndex}`
              }
              iconType={DetailsIcons.nextArrow}
              help={weddingRsvp === undefined ? 'skip' : 'next'}
            />
          )}
          {
            <ImGoing
              help="they're going!"
              selected={weddingRsvp}
              onClick={this.handleClick(true)}
              disabled={disableImGoing}
            />
          }
        </div>
      </div>
    );
  }
}

export const backSelector = (state: State, props: RsvpRelationBarParentProps) =>
  createSelector(
    [getInvitedRehearsal, getRelationshipRsvp],
    invitedRehearsal => {
      const relationId = extractRelationId(props);
      if (relationId === 0) {
        if (invitedRehearsal) {
          return '/rsvp/rehearsal/';
        }
        return '/rsvp/details/';
      }
      const prevRelation = relationId - 1;
      if (
        getRelationshipInvitedRehearsal(state, {
          ...props,
          match: {
            ...props.match,
            params: { relationId: `${prevRelation}` }
          }
        })
      ) {
        return `/rsvp/rehearsal/${prevRelation}`;
      }
      return `/rsvp/details/${prevRelation}`;
    }
  )(state, props);

export const disableImGoingSelector = (
  state: State,
  props: RsvpRelationBarParentProps
) =>
  createSelector(
    [getRelationshipsCacheStatus, getRelationshipRsvp],
    (cacheStatus, weddingRsvp) =>
      cacheStatus === CacheStatus.FETCHING ||
      cacheStatus === CacheStatus.PERSISTING ||
      weddingRsvp === true
  )(state, props);

export const disableCantMakeItSelector = (
  state: State,
  props: RsvpRelationBarParentProps
) =>
  createSelector(
    [getRelationshipsCacheStatus, getRelationshipRsvp],
    (cacheStatus, weddingRsvp) =>
      cacheStatus === CacheStatus.FETCHING ||
      cacheStatus === CacheStatus.PERSISTING ||
      weddingRsvp === false
  )(state, props);

export const displaySkipSelector = (
  state: State,
  props: RsvpRelationBarParentProps
): true | undefined =>
  createSelector(
    [getRelationshipRsvp, getHasMoreRelations],
    (weddingRsvp, hasMoreRelations) =>
      hasMoreRelations || weddingRsvp !== undefined || undefined
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpRelationBarParentProps
) =>
  createSelector(
    [getRelationshipRsvp, getRelationshipId],
    (weddingRsvp, userId) => ({
      back: backSelector(state, props),
      disableCantMakeIt: disableCantMakeItSelector(state, props),
      disableImGoing: disableImGoingSelector(state, props),
      displaySkip: displaySkipSelector(state, props),
      userId,
      weddingRsvp
    })
  )(state, props);

export const actionCreators = {
  rsvpCeremony
};

export const UnstyledRsvpRelationBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelationBar);

export const RsvpRelationBar = withStyles(buttonBarStyles)(
  UnstyledRsvpRelationBar
);
