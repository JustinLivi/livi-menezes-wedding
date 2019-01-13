export interface ProfileData {
  name: string;
  id: string;
  rehearsal: boolean;
  relationships?: string[];
  profile?: {
    about: string;
    photo: string;
  };
}
