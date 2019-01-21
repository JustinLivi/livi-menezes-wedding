import { UserData } from '../common';

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING',
  PERSISTING = 'PERSISTING',
  ERRORED = 'ERRORED'
}

export interface State {
  swipe?: 'left' | 'right';
  redirect?: string;
  relationshipsCacheStatus: CacheStatus;
  relationships: UserData[];
  userCacheStatus: CacheStatus;
  user?: UserData;
}

export const initialState = {
  relationships: [],
  relationshipsCacheStatus: CacheStatus.BEHIND,
  userCacheStatus: CacheStatus.BEHIND
};
