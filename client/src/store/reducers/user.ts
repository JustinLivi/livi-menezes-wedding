import { Endpoints } from '../../common';
import {
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { FetchUserActionSet } from '../actions/user';
import { CacheStatus, State } from '../stateDefinition';

export const getUserRequestReducer = createKeyableRequestReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', state => {
  state.userCacheStatus = CacheStatus.FETCHING;
});

export const getUserSuccessReducer = createKeyableSuccessReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', (state, { payload }) => {
  state.userCacheStatus = CacheStatus.UP_TO_DATE;
  state.user = payload;
});

export const getUserFailureReducer = createKeyableFailureReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', state => {
  state.userCacheStatus = CacheStatus.ERRORED;
});
