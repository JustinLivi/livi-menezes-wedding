import { Endpoints, ProfileData, RsvpPayload } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface RsvpCeremonyMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_CEREMONY> {
  body: RsvpPayload;
}

export type RsvpCeremonyActionSet = RsaaActionSet<
  RsvpCeremonyMeta,
  ProfileData,
  {}
>;

export const rsvpCeremony = createRsaaActionCreator<
  RsvpCeremonyMeta['body'],
  RsvpCeremonyActionSet
>(body => ({
  body,
  endpoint: Endpoints.RSVP_CEREMONY,
  method: 'POST'
}));
