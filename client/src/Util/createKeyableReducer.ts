import immer, { Draft } from 'immer';
import { mapValues } from 'lodash';
import { Action } from 'redux';

export type ReducerMethod<
  State,
  ReducerAction extends Action<ActionType> = Action<ActionType>,
  ActionType extends string = ReducerAction['type']
> = (state: Draft<State>, action: ReducerAction) => void | State;

export interface KeyableReducer<
  State,
  ReducerAction extends Action<ActionType> = Action<ActionType>,
  ActionType extends string = ReducerAction['type']
> {
  type: ActionType;
  reducer: ReducerMethod<State, ReducerAction>;
}

export type ActionCreator<
  Params,
  A extends Action<ActionType>,
  ActionType extends string = A['type']
> = (params: Params) => A;

export const createActionCreator = <
  Params = never,
  A extends Action<ActionType> = never,
  ActionType extends string = A['type']
>(
  actionCreator: ActionCreator<Params, A, ActionType>
) => actionCreator;

export const createKeyableReducer = <
  State = never,
  ReducerAction extends Action<ActionType> = never,
  ActionType extends string = ReducerAction['type']
>(
  type: ActionType,
  reducer: ReducerMethod<State, ReducerAction>
) => ({
  reducer,
  type
});

export const combineKeyableReducers = <State = never>(defaultState: State) => (
  ...keyableReducers: Array<KeyableReducer<State, any, any>>
) => (baseState: State = defaultState, action: Action): State => {
  let newState: State = baseState;
  mapValues(keyableReducers, (reducer: KeyableReducer<State>) => {
    if (reducer.type === action.type) {
      // tslint:disable-next-line:no-object-literal-type-assertion
      newState = {
        ...(immer<State, void | State>(newState, state => {
          return reducer.reducer(state, action);
        }) as object)
      } as State;
    }
  });
  return newState;
};
