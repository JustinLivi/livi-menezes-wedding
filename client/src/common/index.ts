export interface Profile {
  about: string;
  photo: string;
}

export interface UserData {
  name: string;
  id: string;
  rehearsal: boolean;
  relationships?: string[];
  profile?: Profile;
  attendingWedding?: boolean;
  attendingRehearsal?: boolean;
  address?: string;
  favoriteDanceSong?: string;
  dietaryRestrictions?: string;
}

export interface RsvpPayload {
  userId: string;
  rsvp: boolean;
}

export interface DetailsUpdates {
  address?: string;
  favoriteDanceSong?: string;
  dietaryRestrictions?: string;
}

export interface UpdateDetailsPayload extends DetailsUpdates {
  userId: string;
}

export enum Endpoints {
  GET_BY_USER_ID = '/user/:userId',
  RSVP_CEREMONY = '/rsvp/ceremony',
  RSVP_REHEARSAL = '/rsvp/rehearsal',
  RSVP_DETAILS = '/rsvp/details',
  ANSWER_QUIZ = '/quiz/:questionId'
}
