import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { rsvpRehearsal } from '../store/actions/rsvpRehearsal';
import { getRehearsalRsvp, getRelationshipsCount, getUserCacheStatus, getUserId } from '../store/selectors/user';
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
    height: 132,
    justifyContent: 'center',
    margin: theme.spacing.unit
  }
});

export interface RsvpRehearsalBarStateProps {
  next: string;
  disableCantMakeIt: boolean;
  disableImGoing: boolean;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpRehearsalBarDetailsProps {
  rsvpRehearsal: typeof rsvpRehearsal;
}

export interface RsvpRehearsalBarParentProps
  extends WithStyles<typeof styles> {}

export type RsvpRehearsalBarProps = RsvpRehearsalBarStateProps &
  RsvpRehearsalBarDetailsProps &
  RsvpRehearsalBarParentProps;

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
    const {
      next,
      disableCantMakeIt,
      disableImGoing,
      weddingRsvp,
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
          <Details
            to={`/rsvp/details/`}
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

export const disableImGoingSelector = createSelector(
  [getUserCacheStatus, getRehearsalRsvp],
  (cacheStatus, weddingRsvp) =>
    cacheStatus === CacheStatus.FETCHING ||
    cacheStatus === CacheStatus.PERSISTING ||
    weddingRsvp === true
);

export const disableCantMakeItSelector = createSelector(
  [getUserCacheStatus, getRehearsalRsvp],
  (cacheStatus, weddingRsvp) =>
    cacheStatus === CacheStatus.FETCHING ||
    cacheStatus === CacheStatus.PERSISTING ||
    weddingRsvp === false
);

export const nextSelector = createSelector(
  [getRehearsalRsvp, getRelationshipsCount],
  (weddingRsvp, relationshipsCount) =>
    relationshipsCount && weddingRsvp === undefined
      ? '/rsvp/u/0'
      : '/rsvp/review'
);

export const mapStateToProps = (state: State) =>
  createSelector(
    [getRehearsalRsvp, getUserId],
    (weddingRsvp, userId) => ({
      disableCantMakeIt: disableCantMakeItSelector(state),
      disableImGoing: disableImGoingSelector(state),
      next: nextSelector(state),
      userId,
      weddingRsvp
    })
  )(state);

export const actionCreators = {
  rsvpRehearsal
};

export const UnstyledRsvpRehearsalBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsalBar);

export const RsvpRehearsalBar = withStyles(styles)(UnstyledRsvpRehearsalBar);
