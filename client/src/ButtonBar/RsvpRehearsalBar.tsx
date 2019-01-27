import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { rsvpRehearsal } from '../store/actions/rsvpRehearsal';
import { getRehearsalRsvp, getRelationshipsCount, getUserCacheStatus, getUserId } from '../store/selectors/user';
import { CacheStatus, State } from '../store/stateDefinition';
import { ButtonBar } from './ButtonBar';
import { CantMakeIt } from './CantMakeIt';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';
import { ImGoing } from './ImGoing';

export interface RsvpRehearsalBarStateProps {
  next: string;
  disableButtons: boolean;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpRehearsalBarDetailsProps {
  rsvpRehearsal: typeof rsvpRehearsal;
}

export type RsvpRehearsalBarProps = RsvpRehearsalBarStateProps &
  RsvpRehearsalBarDetailsProps;

export class UnconnectedRsvpRehearsalBar extends React.Component<
  RsvpRehearsalBarProps
> {
  constructor(props: RsvpRehearsalBarProps) {
    super(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const { rsvpRehearsal: rsvp, userId } = this.props;
    if (userId) {
      rsvp({
        body: { userId, rsvp: response },
        params: {}
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
          to={`/rsvp/details/`}
          iconType={ChevronIcons.backArrow}
          help='back'
        />
        <Chevron
          to={next}
          iconType={ChevronIcons.nextArrow}
          help={weddingRsvp === undefined ? 'skip' : 'next'}
        />
        <ImGoing
          help="I'm going!"
          selected={weddingRsvp}
          onClick={this.handleClick(true)}
          disabled={disableButtons}
        />
      </ButtonBar>
    );
  }
}

export const disableButtonsSelector = createSelector(
  [getUserCacheStatus],
  cacheStatus =>
    cacheStatus === CacheStatus.FETCHING ||
    cacheStatus === CacheStatus.PERSISTING
);

export const nextSelector = createSelector(
  [getRelationshipsCount],
  relationshipsCount => (relationshipsCount ? '/rsvp/u/0' : '/rsvp/review')
);

export const mapStateToProps = (state: State) =>
  createSelector(
    [getRehearsalRsvp, getUserId],
    (weddingRsvp, userId) => ({
      disableButtons: disableButtonsSelector(state),
      next: nextSelector(state),
      userId,
      weddingRsvp
    })
  )(state);

export const actionCreators = {
  rsvpRehearsal
};

export const RsvpRehearsalBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalBar);
