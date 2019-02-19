export interface Answer {
  answerId: number;
  correct: boolean;
}

export interface Profile {
  relationships?: string[];
  address?: string;
  rehearsal?: true;
  dietaryRestrictions?: string;
  attendingRehearsal: boolean;
  profile?: {
    about?: string;
    photo?: string;
  };
  answers: Answer[];
  favoriteDanceSong?: string;
  name: string;
  attendingWedding?: boolean;
  id: string;
}
