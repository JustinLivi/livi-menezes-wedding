import { IGetProfilePayload } from '../../../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { IRsaaMeta } from '../../Util/rsaaActionCreatorFactory';
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
  endpoint: Endpoints.GET_BY_PROFILE_ID,
  method: 'GET',
  params
}));
