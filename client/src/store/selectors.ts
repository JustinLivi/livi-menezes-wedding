import { match } from 'react-router-dom';

import { UserData } from '../common';
import { State } from './stateDefinition';

export const getUserCacheStatus = ({ userCacheStatus }: State) =>
  userCacheStatus;

export const getUser = ({ user }: State) => user;

export const getUserId = ({ user }: State) => user && user.id;

export const getWeddingRsvp = ({ user }: State) =>
  user && user.attendingWedding;

export const getFavoriteDanceSong = ({ user }: State) =>
  user && user.favoriteDanceSong;

export const getAddress = ({ user }: State) => user && user.address;

export const getProfile = ({ user }: State) => user && user.profile;

export const getDietaryRestrictions = ({ user }: State) =>
  user && user.dietaryRestrictions;

export const getRedirect = ({ redirect }: State) => redirect;

export const getRelationships = ({ user }: State): string[] | undefined =>
  (user && user.relationships) || undefined;

export const getRelationshipsCacheStatus = ({
  relationshipsCacheStatus
}: State) => relationshipsCacheStatus;

export const getRelationship = (
  { relationships }: State,
  {
    match: {
      params: { relationId }
    }
  }: { match: match<{ relationId: string }> }
): UserData | undefined =>
  (relationId && relationships && relationships[parseInt(relationId, 10)]) ||
  undefined;

export const getRelationshipId = (
  { user }: State,
  {
    match: {
      params: { relationId }
    }
  }: { match: match<{ relationId: string }> }
): string | undefined =>
  (relationId !== undefined &&
    user &&
    user.relationships &&
    user.relationships[parseInt(relationId, 10)]) ||
  undefined;

export const getRelationshipRsvp = (
  state: State,
  params: { match: match<{ relationId: string }> }
): boolean | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.attendingWedding;
};

export const getRelationshipName = (
  state: State,
  params: { match: match<{ relationId: string }> }
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.name;
};

export const getRelationshipPhoto = (
  state: State,
  params: { match: match<{ relationId: string }> }
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.profile && relationship.profile.photo;
};
