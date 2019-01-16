import { State } from './stateDefinition';

export const getUserCacheStatus = ({ userCacheStatus }: State) =>
  userCacheStatus;

export const getUserId = ({ user }: State) => user && user.id;

export const getWeddingRsvp = ({ user }: State) =>
  user && user.attendingWedding;

export const getFavoriteDanceSong = ({ user }: State) =>
  user && user.favoriteDanceSong;

export const getAddress = ({ user }: State) => user && user.address;

export const getProfile = ({ user }: State) => user && user.profile;
