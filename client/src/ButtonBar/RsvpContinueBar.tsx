import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import {
  getHasMoreRelations,
  getRelationshipId,
  getRelationshipRsvp,
  getRelationshipsCacheStatus,
} from '../store/selectors';
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

export interface RsvpContinueBarStateProps {
  displaySkip?: true;
  disableCantMakeIt: boolean;
  disableImGoing: boolean;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpContinueBarDetailsProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export interface RsvpContinueBarParentProps extends WithStyles<typeof styles> {
  match: match<{ relationId: string }>;
}

export type RsvpContinueBarProps = RsvpContinueBarStateProps &
  RsvpContinueBarDetailsProps &
  RsvpContinueBarParentProps;

export class UnconnectedRsvpContinueBar extends React.Component<
  RsvpContinueBarProps
> {
  constructor(props: RsvpContinueBarProps) {
    super(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const {
      rsvpCeremony: rsvp,
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
      displaySkip,
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
            to={
              relationIndex > 0
                ? `/rsvp/details/${relationIndex - 1}`
                : '/rsvp/details/'
            }
            iconType={DetailsIcons.backArrow}
            help='back'
          />
          {displaySkip && (
            <Details
              to={
                weddingRsvp === undefined
                  ? `/rsvp/u/${relationIndex + 1}`
                  : `/rsvp/details/${relationIndex}`
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

export const disableImGoingSelector = (
  state: State,
  props: RsvpContinueBarParentProps
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
  props: RsvpContinueBarParentProps
) =>
  createSelector(
    [getRelationshipsCacheStatus, getRelationshipRsvp],
    (cacheStatus, weddingRsvp) =>
      cacheStatus === CacheStatus.FETCHING ||
      cacheStatus === CacheStatus.PERSISTING ||
      weddingRsvp === false
  )(state, props);

export const mapStateToProps = (
  state: State,
  props: RsvpContinueBarParentProps
) =>
  createSelector(
    [getRelationshipRsvp, getRelationshipId],
    (weddingRsvp, userId) => ({
      disableCantMakeIt: disableCantMakeItSelector(state, props),
      disableImGoing: disableImGoingSelector(state, props),
      displaySkip: getHasMoreRelations(state, props),
      userId,
      weddingRsvp
    })
  )(state, props);

export const actionCreators = {
  rsvpCeremony
};

export const UnstyledRsvpContinueBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpContinueBar);

export const RsvpContinueBar = withStyles(styles)(UnstyledRsvpContinueBar);
