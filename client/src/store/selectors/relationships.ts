import { UserData } from '../../common';
import { State } from '../stateDefinition';
import { extractRelationId, RelationIdRouteProps } from './common';

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

export const getRelationshipInvitedRehearsal = (
  state: State,
  params: RelationIdRouteProps
): boolean | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.rehearsal;
};

export const getRelationshipRsvpRehearsal = (
  state: State,
  params: RelationIdRouteProps
): boolean | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.attendingRehearsal;
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

export const getRelationshipAddress = (
  state: State,
  params: RelationIdRouteProps
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.address;
};

export const getRelationshipFavoriteDanceSong = (
  state: State,
  params: RelationIdRouteProps
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.favoriteDanceSong;
};

export const getRelationshipDietaryRestrictions = (
  state: State,
  params: RelationIdRouteProps
): string | undefined => {
  const relationship = getRelationship(state, params);
  return relationship && relationship.dietaryRestrictions;
};
