import { createKeyableReducer } from '../../Util/createKeyableReducer';
import { REDIRECTED, RedirectedAction } from '../actions/redirect';
import { State } from '../stateDefinition';

export const redirectReducer = createKeyableReducer<State, RedirectedAction>(
  REDIRECTED,
  state => {
    state.swipe = undefined;
    state.redirect = undefined;
  }
);
