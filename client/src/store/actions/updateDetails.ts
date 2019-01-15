import { Endpoints, ProfileData, UpdateDetailsPayload } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface UpdateDetailsMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_DETAILS> {
  body: UpdateDetailsPayload;
}

export type UpdateDetailsActionSet = RsaaActionSet<
  UpdateDetailsMeta,
  ProfileData,
  {}
>;

export const updateDetails = createRsaaActionCreator<
  UpdateDetailsMeta['body'],
  UpdateDetailsActionSet
>(body => ({
  body,
  endpoint: Endpoints.RSVP_DETAILS,
  method: 'POST'
}));
