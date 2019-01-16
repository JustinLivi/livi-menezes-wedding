import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Endpoints } from '../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../Util/rsaaActionCreator';
import { RsvpCeremonyActionSet } from './actions/rsvpCeremony';
import { FetchUserActionSet } from './actions/user';
import { CacheStatus, State } from './stateDefinition';

const getProfileRequestReducer = createKeyableRequestReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', state => {
  state.userCacheStatus = CacheStatus.FETCHING;
});

const getProfileSuccessReducer = createKeyableSuccessReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', (state, { payload }) => {
  state.userCacheStatus = CacheStatus.UP_TO_DATE;
  state.user = payload;
});

const getProfileFailureReducer = createKeyableFailureReducer<
  State,
  FetchUserActionSet
>(Endpoints.GET_BY_USER_ID, 'GET', state => {
  state.userCacheStatus = CacheStatus.ERRORED;
});

const rsvpCeremonyRequestReducer = createKeyableRequestReducer<
  State,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', (state, { meta: { body } }) => {
  state.userCacheStatus = CacheStatus.PERSISTING;
  if (state.user) {
    state.user.attendingWedding = body.rsvp;
  }
});

const rsvpCeremonySuccessReducer = createKeyableSuccessReducer<
  State,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', state => {
  state.userCacheStatus = CacheStatus.UP_TO_DATE;
});

const apiReducers = combineKeyableRsaaReducers<State>({
  userCacheStatus: CacheStatus.BEHIND
})(
  getProfileRequestReducer,
  getProfileSuccessReducer,
  getProfileFailureReducer,
  rsvpCeremonyRequestReducer,
  rsvpCeremonySuccessReducer
);

export const reducer = persistReducer(
  {
    key: 'user',
    storage,
    whitelist: ['user']
  },
  apiReducers
);
