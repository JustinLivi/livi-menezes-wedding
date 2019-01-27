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
import { Details, DetailsIcons } from './Details';
import { ImGoing } from './ImGoing';

export interface RsvpRelationBarStateProps {
  cacheStatus: CacheStatus;
  displaySkip?: true;
  disableButtons: boolean;
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
    const {
      displaySkip,
      disableButtons,
      weddingRsvp,
      back,
      cacheStatus
    } = this.props;
    if (cacheStatus === CacheStatus.ERRORED) {
      return <Redirect to={back} />;
    }
    return (
      <ButtonBar>
        <CantMakeIt
          help="can't make it"
          onClick={this.handleClick(false)}
          disabled={disableButtons}
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
            disabled={disableButtons}
          />
        }
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
      if (
        getRelationshipInvitedRehearsal(state, prevParams) &&
        getRelationshipRsvp(state, prevParams)
      ) {
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
    [getRelationshipRsvp, getRelationshipId, getRelationshipsCacheStatus],
    (weddingRsvp, userId, cacheStatus) => ({
      back: backSelector(state, props),
      cacheStatus,
      disableButtons: disableButtonsSelector(state),
      displaySkip: displaySkipSelector(state, props),
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
