import reduceReducers from 'reduce-reducers';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { State } from '../stateDefinition';
import { quizRootReducer } from './quiz';
import { redirectRootReducer } from './redirect';
import { rsvpCeremonyRootReducer } from './rsvpCeremony';
import { rsvpRehearsalRootReducer } from './rsvpRehearsal';
import { updateDetailsRootReducer } from './updateDetails';
import { userRootReducer } from './user';

const rootReducer = reduceReducers<State>(
  quizRootReducer,
  redirectRootReducer,
  rsvpCeremonyRootReducer,
  rsvpRehearsalRootReducer,
  updateDetailsRootReducer,
  userRootReducer
);

export const reducer = persistReducer(
  {
    key: 'user',
    storage,
    whitelist: ['user']
  },
  rootReducer as Reducer<State>
);
