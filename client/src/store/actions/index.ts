import { IGetProfilePayload } from '../../../../common';
import { createRsaaActionCreator, IRsaaMeta, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { Endpoints } from '../endpoints';

export interface IGetProfileMeta
  extends IRsaaMeta<'GET', Endpoints.GET_BY_PROFILE_ID> {
  params: { profileId: string };
}

export type IGetProfileActionSet = RsaaActionSet<
  IGetProfileMeta,
  IGetProfilePayload,
  {}
>;

export const getProfile = createRsaaActionCreator<
  IGetProfileMeta,
  IGetProfileActionSet
>(params => ({
  endpoint: '/profiles/',
  method: 'GET',
  params
}));
