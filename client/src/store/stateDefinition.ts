import { IGetProfilePayload } from '../../../common';

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING',
  PERSISTING = 'PERSISTING'
}

export interface IProfile {
  cacheStatus: CacheStatus;
  data?: IGetProfilePayload;
}

export interface IState {
  profile: IProfile;
}
