import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import { getUserCacheStatus, getUserId, getWeddingRsvp } from '../store/selectors/user';
import { CacheStatus } from '../store/stateDefinition';
import { ButtonBar } from './ButtonBar';
import { CantMakeIt } from './CantMakeIt';
import { Details, DetailsIcons } from './Details';
import { ImGoing } from './ImGoing';

export interface RsvpBarStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpBarDispatchProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export type RsvpBarProps = RsvpBarStateProps & RsvpBarDispatchProps;

export class UnconnectedRsvpBar extends React.Component<RsvpBarProps> {
  constructor(props: RsvpBarProps) {
    super(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const { rsvpCeremony: rsvp, userId } = this.props;
    if (userId) {
      rsvp({ body: { userId, rsvp: response }, params: {} });
    }
  };

  public render() {
    const { cacheStatus, weddingRsvp } = this.props;
    return (
      <ButtonBar>
        <CantMakeIt
          help="can't make it"
          onClick={this.handleClick(false)}
          disabled={
            cacheStatus === CacheStatus.FETCHING ||
            cacheStatus === CacheStatus.PERSISTING
          }
          selected={weddingRsvp === false}
        />
        <Details to='/' iconType={DetailsIcons.backArrow} help='back' />
        <Details
          help='next'
          disabled={weddingRsvp === undefined}
          to='/rsvp/details'
          iconType={DetailsIcons.nextArrow}
        />
        <ImGoing
          help="I'm going!"
          onClick={this.handleClick(true)}
          disabled={
            cacheStatus === CacheStatus.FETCHING ||
            cacheStatus === CacheStatus.PERSISTING
          }
          selected={weddingRsvp === true}
        />
      </ButtonBar>
    );
  }
}

export const mapStateToProps = createSelector(
  [getUserCacheStatus, getWeddingRsvp, getUserId],
  (cacheStatus, weddingRsvp, userId) => ({
    cacheStatus,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  rsvpCeremony
};

export const RsvpBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpBar);
