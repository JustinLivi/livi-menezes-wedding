import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ProfileData } from '../../../common';
import { ProfileCard } from '../Components/ProfileCard';
import { PICTURE_ENDPOINT } from '../config';
import { fetchProfile } from '../store/actions/profile';
import { getProfileCacheStatus, getProfileData } from '../store/selectors';
import { CacheStatus } from '../store/stateDefinition';

export interface ProfileStateProps {
  cacheStatus: CacheStatus;
  profileData?: ProfileData;
}

export interface ProfileDispatchProps {
  fetchProfile: typeof fetchProfile;
}

export interface ProfileParentProps {
  profileId: string;
}

export type ProfileProps = ProfileStateProps &
  ProfileDispatchProps &
  ProfileParentProps;

export class UnconnectedProfileContainer extends React.Component<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  public componentDidMount() {
    const {
      cacheStatus,
      fetchProfile: shouldFetchProfile,
      profileId
    } = this.props;
    if (cacheStatus === CacheStatus.BEHIND) {
      shouldFetchProfile({ profileId });
    }
  }

  public render() {
    const { profileData } = this.props;
    if (profileData && profileData.profile) {
      const {
        profile: { photo }
      } = profileData;
      return (
        <ProfileCard
          image={`${PICTURE_ENDPOINT}/${photo}`}
          title="Justin and Marisa's Wedding"
        />
      );
    }
    return <div>404</div>;
  }
}

export const mapStateToProps = createSelector(
  [getProfileCacheStatus, getProfileData],
  (cacheStatus, profileData) => ({
    cacheStatus,
    profileData
  })
);

export const actionCreators = {
  fetchProfile
};

export const ProfileContainer = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedProfileContainer);
