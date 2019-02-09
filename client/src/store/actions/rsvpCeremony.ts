import { Endpoints, RsvpPayload, UserData } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface RsvpCeremonyMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_CEREMONY> {
  body: RsvpPayload;
  params: { relationshipIndex?: number; noRedirect?: boolean };
}

export type RsvpCeremonyActionSet = RsaaActionSet<
  RsvpCeremonyMeta,
  UserData,
  {}
>;

export const rsvpCeremony = createRsaaActionCreator<
  {
    body: RsvpCeremonyMeta['body'];
    params: RsvpCeremonyMeta['params'];
  },
  RsvpCeremonyActionSet
>(({ body, params }) => ({
  body,
  endpoint: Endpoints.RSVP_CEREMONY,
  method: 'POST',
  params
}));
