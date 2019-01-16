import reduceReducers from 'reduce-reducers';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineKeyableReducers } from '../../Util/createKeyableReducer';
import { combineKeyableRsaaReducers } from '../../Util/rsaaActionCreator';
import { CacheStatus, State } from '../stateDefinition';
import { rsvpCeremonyFailureReducer, rsvpCeremonyRequestReducer, rsvpCeremonySuccessReducer } from './rsvpCeremony';
import {
  changeDetailsReducer,
  updateDetailsFailureReducer,
  updateDetailsRequestReducer,
  updateDetailsSuccessReducer,
} from './updateDetails';
import { getUserFailureReducer, getUserRequestReducer, getUserSuccessReducer } from './user';

const initialState = {
  userCacheStatus: CacheStatus.BEHIND
};

const apiReducers = combineKeyableRsaaReducers<State>(initialState)(
  getUserRequestReducer,
  getUserSuccessReducer,
  getUserFailureReducer,
  rsvpCeremonyRequestReducer,
  rsvpCeremonySuccessReducer,
  rsvpCeremonyFailureReducer,
  updateDetailsRequestReducer,
  updateDetailsSuccessReducer,
  updateDetailsFailureReducer
);

const standardReducers = combineKeyableReducers<State>(initialState)(
  changeDetailsReducer
);

const rootReducer = reduceReducers<State>(standardReducers, apiReducers);

export const reducer = persistReducer(
  {
    key: 'user',
    storage,
    whitelist: ['user']
  },
  rootReducer as Reducer<State>
);
