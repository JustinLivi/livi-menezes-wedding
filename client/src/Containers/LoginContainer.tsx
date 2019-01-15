import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Profile } from '../common';
import { ErrorMessage } from '../Components/ErrorMessage';
import { fetchProfile } from '../store/actions/profile';
import { getProfile, getProfileCacheStatus } from '../store/selectors';
import { CacheStatus } from '../store/stateDefinition';

export interface LoginStateProps {
  cacheStatus: CacheStatus;
  profile?: Profile;
}

export interface LoginDispatchProps {
  fetchProfile: typeof fetchProfile;
}

export interface LoginParentProps {
  userId: string;
}

export type LoginProps = LoginStateProps &
  LoginDispatchProps &
  LoginParentProps;

export class UnconnectedLoginContainer extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props);
  }

  public componentDidMount() {
    const {
      cacheStatus,
      fetchProfile: shouldFetchProfile,
      userId
    } = this.props;
    if (cacheStatus === CacheStatus.BEHIND) {
      shouldFetchProfile({ userId });
    }
  }

  public render() {
    const { profile, cacheStatus } = this.props;
    if (cacheStatus === CacheStatus.FETCHING) {
      return (
        <div>
          <CircularProgress color='secondary' />
        </div>
      );
    }
    if (!profile || cacheStatus === CacheStatus.ERRORED) {
      return <ErrorMessage />;
    }
    if (profile) {
      return <Redirect to='/' />;
    }
  }
}

export const mapStateToProps = createSelector(
  [getProfileCacheStatus, getProfile],
  (cacheStatus, profile) => ({
    cacheStatus,
    profile
  })
);

export const actionCreators = {
  fetchProfile
};

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedLoginContainer);
