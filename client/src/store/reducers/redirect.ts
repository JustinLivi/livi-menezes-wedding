import { combineKeyableReducers, createKeyableReducer } from '../../Util/createKeyableReducer';
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
