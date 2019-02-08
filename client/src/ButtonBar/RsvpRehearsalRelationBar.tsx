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
import { ButtonBar } from './ButtonBar';
import { CantMakeIt } from './CantMakeIt';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';
import { ImGoing } from './ImGoing';

export interface RsvpRehearsalRelationBarStateProps {
  next: string;
  disableButtons: boolean;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpRehearsalRelationBarDetailsProps {
  rsvpRehearsal: typeof rsvpRehearsal;
}

export interface RsvpRehearsalRelationBarParentProps {
  match: match<{ relationId: string }>;
}

export type RsvpRehearsalRelationBarProps = RsvpRehearsalRelationBarStateProps &
  RsvpRehearsalRelationBarDetailsProps &
  RsvpRehearsalRelationBarParentProps;

export class UnconnectedRsvpRehearsalRelationBar extends React.Component<
  RsvpRehearsalRelationBarProps
> {
  private relationIndex: number;

  constructor(props: RsvpRehearsalRelationBarProps) {
    super(props);
    this.relationIndex = extractRelationId(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const { rsvpRehearsal: rsvp, userId } = this.props;
    if (userId) {
      rsvp({
        body: { userId, rsvp: response },
        params: { relationshipIndex: this.relationIndex }
      });
    }
  };

  public render() {
    const { next, disableButtons, weddingRsvp } = this.props;
    return (
      <ButtonBar>
        <CantMakeIt
          help="can't make it"
          onClick={this.handleClick(false)}
          disabled={disableButtons}
          selected={weddingRsvp === false}
        />
        <Chevron
          to={`/rsvp/details/${this.relationIndex}`}
          iconType={ChevronIcons.backArrow}
          help='back'
        />
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

export const disableButtonsSelector = createSelector(
  [getRelationshipsCacheStatus],
  cacheStatus =>
    cacheStatus === CacheStatus.FETCHING ||
    cacheStatus === CacheStatus.PERSISTING
);

export const nextSelector = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
): string =>
  createSelector(
    [getRelationshipRsvpRehearsal, getHasMoreRelations],
    (weddingRsvp, hasMoreRelations) =>
      hasMoreRelations && weddingRsvp === undefined
        ? `/rsvp/u/${extractRelationId(props) + 1}`
        : '/rsvp/review'
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpRehearsalRelationBarParentProps
) =>
  createSelector(
    [getRelationshipRsvpRehearsal, getRelationshipId],
    (weddingRsvp, userId) => ({
      disableButtons: disableButtonsSelector(state, props),
      next: nextSelector(state, props),
      userId,
      weddingRsvp
    })
  )(state, props);

export const actionCreators = {
  rsvpRehearsal
};

export const RsvpRehearsalRelationBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalRelationBar);
