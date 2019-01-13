import { State } from '../stateDefinition';

export const getProfileCacheStatus = ({ profile: { cacheStatus } }: State) =>
  cacheStatus;

export const getProfileData = ({ profile: { data } }: State) => data;
