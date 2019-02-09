import { combineKeyableReducers, createKeyableReducer } from 'redux-keyable';

import { REDIRECTED, RedirectedAction } from '../actions/redirect';
import { initialState, State } from '../stateDefinition';

export const redirectReducer = createKeyableReducer<State, RedirectedAction>(
  REDIRECTED,
  state => {
    state.swipe = undefined;
    state.redirect = undefined;
  }
);

export const redirectRootReducer = combineKeyableReducers<State>(initialState)(
  redirectReducer
);
