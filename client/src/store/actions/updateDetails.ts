import { Action } from 'redux';

import { DetailsUpdates, Endpoints, UpdateDetailsPayload, UserData } from '../../common';
import { createActionCreator } from '../../Util/createKeyableReducer';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface UpdateDetailsMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_DETAILS> {
  body: UpdateDetailsPayload;
}

export type UpdateDetailsActionSet = RsaaActionSet<
  UpdateDetailsMeta,
  UserData,
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

export const CHANGE_DETAILS = 'CHANGE_DETAILS';
export type CHANGE_DETAILS = 'CHANGE_DETAILS';

export interface ChangeDetailsAction extends Action<CHANGE_DETAILS> {
  updates: DetailsUpdates;
}

export const changeDetails = createActionCreator<
  DetailsUpdates,
  ChangeDetailsAction
>(updates => ({
  type: CHANGE_DETAILS,
  updates
}));
