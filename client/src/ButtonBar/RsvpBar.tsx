import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import { getUserCacheStatus, getUserId, getWeddingRsvp } from '../store/selectors/user';
import { CacheStatus } from '../store/stateDefinition';
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

export interface RsvpBarStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpBarDetailsProps {
  rsvpCeremony: typeof rsvpCeremony;
  detailsIconType?: DetailsIcons;
}

export interface RsvpBarParentProps extends WithStyles<typeof styles> {
  toDetails: string;
  onlyInfo?: true;
  hideHelp?: true;
  external?: boolean;
}

export type RsvpBarProps = RsvpBarStateProps &
  RsvpBarDetailsProps &
  RsvpBarParentProps;

export class UnstyledRsvpBar extends React.Component<RsvpBarProps> {
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
    const {
      onlyInfo,
      hideHelp,
      toDetails,
      external,
      cacheStatus,
      weddingRsvp,
      classes: { root, buttonBar },
      detailsIconType
    } = this.props;
    return (
      <div className={root}>
        <div className={buttonBar}>
          {!onlyInfo && (
            <CantMakeIt
              hideHelp={hideHelp}
              onClick={this.handleClick(false)}
              disabled={
                cacheStatus === CacheStatus.FETCHING ||
                cacheStatus === CacheStatus.PERSISTING ||
                weddingRsvp === false
              }
              selected={weddingRsvp === false}
            />
          )}
          <Details
            help={
              hideHelp
                ? undefined
                : weddingRsvp === undefined
                ? 'details'
                : 'next'
            }
            to={toDetails}
            external={external}
            iconType={detailsIconType}
          />
          {!onlyInfo && (
            <ImGoing
              help={hideHelp ? undefined : "I'm going!"}
              onClick={this.handleClick(true)}
              disabled={
                cacheStatus === CacheStatus.FETCHING ||
                cacheStatus === CacheStatus.PERSISTING ||
                weddingRsvp
              }
              selected={weddingRsvp === true}
            />
          )}
        </div>
      </div>
    );
  }
}

export const UnconnectedButtonBar = withStyles(styles)(UnstyledRsvpBar);

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
)(UnconnectedButtonBar);
