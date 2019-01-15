import { State } from '../stateDefinition';

export const getProfileCacheStatus = ({ profile: { cacheStatus } }: State) =>
  cacheStatus;

export const getUserId = ({ profile: { data } }: State) => data && data.id;

export const getWeddingRsvp = ({ profile: { data } }: State) =>
  data && data.attendingWedding;

export const getFavoriteDanceSong = ({ profile: { data } }: State) =>
  data && data.favoriteDanceSong;

export const getProfile = ({ profile: { data } }: State) =>
  data && data.profile;
