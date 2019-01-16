import { Endpoints, RsvpPayload, UserData } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface RsvpRehearsalMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_REHEARSAL> {
  body: RsvpPayload;
}

export type RsvpRehearsalActionSet = RsaaActionSet<
  RsvpRehearsalMeta,
  UserData,
  {}
>;

export const rsvpRehearsal = createRsaaActionCreator<
  RsvpRehearsalMeta['body'],
  RsvpRehearsalActionSet
>(params => ({
  endpoint: Endpoints.RSVP_REHEARSAL,
  method: 'POST',
  params
}));
