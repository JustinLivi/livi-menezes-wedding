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
}

export interface RsvpPayload {
  userId: string;
  rsvp: boolean;
}

export interface UpdateDetailsPayload {
  userId: string;
  address?: string;
  favoriteDanceSong?: string;
}

export enum Endpoints {
  GET_BY_USER_ID = '/user/:userId',
  RSVP_CEREMONY = '/rsvp/ceremony',
  RSVP_REHEARSAL = '/rsvp/rehearsal',
  RSVP_DETAILS = '/rsvp/details',
  ANSWER_QUIZ = '/quiz/:questionId'
}
