import { CacheStatus, State } from '../stateDefinition';
import { extractRelationId, RelationIdRouteProps } from './common';

export const getUserCacheStatus = ({ userCacheStatus }: State) =>
  userCacheStatus;

export const getIsLoading = ({ userCacheStatus }: State) =>
  userCacheStatus === CacheStatus.BEHIND ||
  userCacheStatus === CacheStatus.FETCHING;

export const getUser = ({ user }: State) => user;

export const getUserId = ({ user }: State) => user && user.id;

export const getWeddingRsvp = ({ user }: State) =>
  user && user.attendingWedding;

export const getFavoriteDanceSong = ({ user }: State) =>
  user && user.favoriteDanceSong;

export const getAddress = ({ user }: State) => user && user.address;

export const getProfile = ({ user }: State) => user && user.profile;

export const getPhoto = (state: State) => {
  const profile = getProfile(state);
  return profile && profile.photo;
};

export const getName = ({ user }: State) => user && user.name;

export const getDietaryRestrictions = ({ user }: State) =>
  user && user.dietaryRestrictions;

export const getRedirect = ({ redirect }: State) => redirect;

export const getRelationships = ({ user }: State): string[] | undefined =>
  (user && user.relationships) || undefined;

export const getRelationshipsCount = ({ user }: State): number =>
  (user && user.relationships && user.relationships.length) || 0;

export const getHasMoreRelations = (
  state: State,
  props: RelationIdRouteProps
): true | undefined =>
  extractRelationId(props) < getRelationshipsCount(state) - 1 || undefined;
