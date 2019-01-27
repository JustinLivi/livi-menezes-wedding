import * as React from 'react';
import { connect } from 'react-redux';
import { match, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import { extractRelationId } from '../store/selectors/common';
import {
  getRelationshipId,
  getRelationshipInvitedRehearsal,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../store/selectors/relationships';
import { getHasMoreRelations, getInvitedRehearsal, getWeddingRsvp } from '../store/selectors/user';
import { CacheStatus, State } from '../store/stateDefinition';
import { ButtonBar } from './ButtonBar';
import { CantMakeIt } from './CantMakeIt';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';
import { ImGoing } from './ImGoing';

export interface RsvpRelationBarStateProps {
  cacheStatus: CacheStatus;
  disableButtons: boolean;
  next: string;
  userId?: string;
  weddingRsvp?: boolean;
  back: string;
}

export interface RsvpRelationBarDetailsProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export interface RsvpRelationBarParentProps {
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
    const { disableButtons, weddingRsvp, back, cacheStatus, next } = this.props;
    return cacheStatus === CacheStatus.ERRORED ? (
      <Redirect to={back} />
    ) : (
      <ButtonBar>
        <CantMakeIt
          help="can't make it"
          onClick={this.handleClick(false)}
          disabled={disableButtons}
          selected={weddingRsvp === false}
        />
        <Chevron to={back} iconType={ChevronIcons.backArrow} help='back' />
        <Chevron
          to={next}
          iconType={ChevronIcons.nextArrow}
          help={weddingRsvp === undefined ? 'skip' : 'next'}
        />
        <ImGoing
          help="they're going!"
          selected={weddingRsvp}
          onClick={this.handleClick(true)}
          disabled={disableButtons}
        />
      </ButtonBar>
    );
  }
}

export const backSelector = (state: State, props: RsvpRelationBarParentProps) =>
  createSelector(
    [getInvitedRehearsal, getWeddingRsvp],
    (invitedRehearsal, weddingRsvp) => {
      const relationId = extractRelationId(props);
      if (relationId === 0) {
        if (weddingRsvp === undefined) {
          return '/rsvp';
        }
        if (invitedRehearsal && weddingRsvp) {
          return '/rsvp/rehearsal/';
        }
        return '/rsvp/details/';
      }
      const prevRelation = relationId - 1;
      const prevParams = {
        ...props,
        match: {
          ...props.match,
          params: { relationId: `${prevRelation}` }
        }
      };
      const relationRsvp = getRelationshipRsvp(state, prevParams);
      if (relationRsvp === undefined) {
        return `/rsvp/u/${prevRelation}`;
      }
      if (getRelationshipInvitedRehearsal(state, prevParams) && relationRsvp) {
        return `/rsvp/rehearsal/${prevRelation}`;
      }
      return `/rsvp/details/${prevRelation}`;
    }
  )(state);

export const disableButtonsSelector = createSelector(
  [getRelationshipsCacheStatus],
  cacheStatus =>
    cacheStatus === CacheStatus.FETCHING ||
    cacheStatus === CacheStatus.PERSISTING
);

export const nextSelector = (
  state: State,
  props: RsvpRelationBarParentProps
): string =>
  createSelector(
    [getRelationshipRsvp, getHasMoreRelations],
    (weddingRsvp, hasMoreRelations) =>
      weddingRsvp !== undefined
        ? `/rsvp/details/${extractRelationId(props)}`
        : hasMoreRelations
        ? `/rsvp/u/${extractRelationId(props) + 1}`
        : '/rsvp/review'
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpRelationBarParentProps
) =>
  createSelector(
    [getRelationshipRsvp, getRelationshipId, getRelationshipsCacheStatus],
    (weddingRsvp, userId, cacheStatus) => ({
      back: backSelector(state, props),
      cacheStatus,
      disableButtons: disableButtonsSelector(state),
      next: nextSelector(state, props),
      userId,
      weddingRsvp
    })
  )(state, props);

export const actionCreators = {
  rsvpCeremony
};

export const RsvpRelationBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRelationBar);
