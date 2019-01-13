import { ProfileData } from '../../../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';
import { Endpoints } from '../endpoints';

export interface FetchProfileMeta
  extends RsaaMeta<'GET', Endpoints.GET_BY_PROFILE_ID> {
  params: { profileId: string };
}

export type FetchProfileActionSet = RsaaActionSet<
  FetchProfileMeta,
  ProfileData,
  {}
>;

export const fetchProfile = createRsaaActionCreator<
  FetchProfileMeta['params'],
  FetchProfileActionSet
>(params => ({
  endpoint: Endpoints.GET_BY_PROFILE_ID,
  method: 'GET',
  params
}));
