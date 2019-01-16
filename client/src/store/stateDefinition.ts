import { UserData } from '../common';

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING',
  PERSISTING = 'PERSISTING',
  ERRORED = 'ERRORED'
}

export interface State {
  userCacheStatus: CacheStatus;
  user?: UserData;
}
