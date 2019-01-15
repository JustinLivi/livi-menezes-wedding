import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { rsvpCeremony } from '../store/actions/rsvpCeremony';
import { getProfileCacheStatus, getUserId, getWeddingRsvp } from '../store/selectors';
import { CacheStatus } from '../store/stateDefinition';
import { theme } from '../theme';
import { CantMakeIt } from './CantMakeIt';
import { Details } from './Details';
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

export interface ButtonBarStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
  weddingRsvp?: boolean;
}

export interface ButtonBarDetailsProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export interface ButtonBarParentProps extends WithStyles<typeof styles> {
  toDetails: string;
  onlyInfo?: true;
  hideHelp?: true;
  external?: boolean;
}

export type ButtonBarProps = ButtonBarStateProps &
  ButtonBarDetailsProps &
  ButtonBarParentProps;

export class UnstyledButtonBar extends React.Component<ButtonBarProps> {
  constructor(props: ButtonBarProps) {
    super(props);
  }

  public handleClick: (
    response: boolean
  ) => React.MouseEventHandler<HTMLElement> = response => event => {
    const { rsvpCeremony: rsvp, userId } = this.props;
    if (userId) {
      rsvp({ userId, rsvp: response });
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
      classes: { root, buttonBar }
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
                !weddingRsvp
              }
            />
          )}
          <Details hideHelp={hideHelp} to={toDetails} external={external} />
          {!onlyInfo && (
            <ImGoing
              hideHelp={hideHelp}
              onClick={this.handleClick(true)}
              disabled={
                cacheStatus === CacheStatus.FETCHING ||
                cacheStatus === CacheStatus.PERSISTING ||
                weddingRsvp
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export const UnconnectedButtonBar = withStyles(styles)(UnstyledButtonBar);

export const mapStateToProps = createSelector(
  [getProfileCacheStatus, getWeddingRsvp, getUserId],
  (cacheStatus, weddingRsvp, userId) => ({
    cacheStatus,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  rsvpCeremony
};

export const ButtonBar = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedButtonBar);
