import { match } from 'react-router-dom';
import { createSelector } from 'reselect';

import { UserData } from '../common';
import { State } from './stateDefinition';

export interface RelationIdRouteProps {
  match: match<{ relationId: string }>;
}

export const extractRelationId = ({
  match: {
    params: { relationId }
  }
}: RelationIdRouteProps) => parseInt(relationId, 10);

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

export const getRelationshipsCount = ({ user }: State): number =>
  (user && user.relationships && user.relationships.length) || 0;

export const getHasMoreRelations = (
  state: State,
  props: RelationIdRouteProps
): true | undefined =>
  createSelector(
    [getRelationshipRsvp, getRelationshipsCount],
    (weddingRsvp, relationshipsCount) =>
      extractRelationId(props) < relationshipsCount - 1 ||
      weddingRsvp !== undefined ||
      undefined
  )(state, props);

export const getRelationshipsCacheStatus = ({
  relationshipsCacheStatus
}: State) => relationshipsCacheStatus;

export const getRelationship = (
  { relationships }: State,
  props: RelationIdRouteProps
): UserData | undefined =>
  (relationships && relationships[extractRelationId(props)]) || undefined;

export const getRelationshipId = (
  { user }: State,
  props: RelationIdRouteProps
): string | undefined =>
  (user &&
    user.relationships &&
    user.relationships[extractRelationId(props)]) ||
  undefined;

export const getRelationshipRsvp = (
  state: State,
  params: RelationIdRouteProps
): boolean | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.attendingWedding;
};

export const getRelationshipName = (
  state: State,
  params: RelationIdRouteProps
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.name;
};

export const getRelationshipPhoto = (
  state: State,
  params: RelationIdRouteProps
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.profile && relationship.profile.photo;
};
