import { Endpoints, UserData } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface FetchUserMeta
  extends RsaaMeta<'GET', Endpoints.GET_BY_USER_ID> {
  params: { userId: string; relationshipIndex?: number };
}

export type FetchUserActionSet = RsaaActionSet<FetchUserMeta, UserData, {}>;

export const fetchUser = createRsaaActionCreator<
  FetchUserMeta['params'],
  FetchUserActionSet
>(params => ({
  endpoint: Endpoints.GET_BY_USER_ID,
  method: 'GET',
  params
}));

export interface FetchRelationshipMeta
  extends RsaaMeta<'GET', Endpoints.GET_BY_USER_ID> {
  params: { userId: string };
}
