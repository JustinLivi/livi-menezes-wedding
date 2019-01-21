import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchUser } from '../store/actions/user';
import { getUserCacheStatus, getUserId } from '../store/selectors/user';
import { CacheStatus } from '../store/stateDefinition';

export interface CacheRefresherStateProps {
  cacheStatus: CacheStatus;
  userId?: string;
}

export interface CacheRefresherDispatchProps {
  fetchUser: typeof fetchUser;
}

export type CacheRefresherProps = CacheRefresherStateProps &
  CacheRefresherDispatchProps;

export class UnconnectedCacheRefresher extends React.Component<
  CacheRefresherProps
> {
  constructor(props: CacheRefresherProps) {
    super(props);
  }

  public componentDidMount() {
    const { cacheStatus, fetchUser: shouldFetch, userId } = this.props;
    if (cacheStatus === CacheStatus.BEHIND && userId) {
      shouldFetch({ userId });
    }
  }

  public componentDidUpdate() {
    this.componentDidMount();
  }

  public render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = createSelector(
  [getUserCacheStatus, getUserId],
  (cacheStatus, userId) => ({ cacheStatus, userId })
);

const actionCreators = {
  fetchUser
};

export const CacheRefresher = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedCacheRefresher);
