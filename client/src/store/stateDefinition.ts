import { ProfileData } from '../../../common';

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING',
  PERSISTING = 'PERSISTING'
}

export interface ProfileState {
  cacheStatus: CacheStatus;
  data?: ProfileData;
}

export interface State {
  profile: ProfileState;
}
