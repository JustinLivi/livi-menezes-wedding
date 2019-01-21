import { Endpoints } from '../../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { FetchUserActionSet } from '../actions/user';
import { CacheStatus, initialState, State } from '../stateDefinition';

export const getUserRequestReducer = createKeyableRequestReducer<
  State,
  FetchUserActionSet
>(
  Endpoints.GET_BY_USER_ID,
  'GET',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      }
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus = CacheStatus.FETCHING;
    } else {
      state.userCacheStatus = CacheStatus.FETCHING;
    }
  }
);

export const getUserSuccessReducer = createKeyableSuccessReducer<
  State,
  FetchUserActionSet
>(
  Endpoints.GET_BY_USER_ID,
  'GET',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      },
      payload
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus = CacheStatus.UP_TO_DATE;
      state.relationships[relationshipIndex] = payload;
    } else {
      state.userCacheStatus = CacheStatus.UP_TO_DATE;
      state.user = payload;
    }
  }
);

export const getUserFailureReducer = createKeyableFailureReducer<
  State,
  FetchUserActionSet
>(
  Endpoints.GET_BY_USER_ID,
  'GET',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      }
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus = CacheStatus.ERRORED;
    } else {
      state.userCacheStatus = CacheStatus.ERRORED;
    }
  }
);

export const userRootReducer = combineKeyableRsaaReducers<State>(initialState)(
  getUserRequestReducer,
  getUserSuccessReducer,
  getUserFailureReducer
);
