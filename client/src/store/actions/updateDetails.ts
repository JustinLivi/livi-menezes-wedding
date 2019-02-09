import { createActionCreator, FluxStandardAction } from 'redux-keyable';

import { DetailsUpdates, Endpoints, UpdateDetailsPayload, UserData } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface UpdateDetailsMeta
  extends RsaaMeta<'POST', Endpoints.RSVP_DETAILS> {
  body: UpdateDetailsPayload;
  params: { relationshipIndex?: number };
}

export type UpdateDetailsActionSet = RsaaActionSet<
  UpdateDetailsMeta,
  UserData,
  {}
>;

export const updateDetails = createRsaaActionCreator<
  {
    body: UpdateDetailsMeta['body'];
    params: UpdateDetailsMeta['params'];
  },
  UpdateDetailsActionSet
>(({ body, params }) => ({
  body,
  endpoint: Endpoints.RSVP_DETAILS,
  method: 'POST',
  params
}));

export const CHANGE_DETAILS = 'CHANGE_DETAILS';

export interface ChangeDetailsAction
  extends FluxStandardAction<typeof CHANGE_DETAILS> {
  payload: DetailsUpdates;
}

export const changeDetails = createActionCreator<
  DetailsUpdates,
  ChangeDetailsAction
>(payload => ({
  payload,
  type: CHANGE_DETAILS
}));

export const CHANGE_DETAILS_RELATION = 'CHANGE_DETAILS_RELATION';

export interface ChangeDetailsRelationAction
  extends FluxStandardAction<typeof CHANGE_DETAILS_RELATION> {
  payload: DetailsUpdates;
  meta: { relationIndex: number };
}

export const changeDetailsRelation = createActionCreator<
  { updates: DetailsUpdates; relationIndex: number },
  ChangeDetailsRelationAction
>(({ updates, relationIndex }) => ({
  meta: { relationIndex },
  payload: updates,
  type: CHANGE_DETAILS_RELATION
}));
