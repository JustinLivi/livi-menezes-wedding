import immer, { Draft } from 'immer';
import { find } from 'lodash';
import { Action } from 'redux';

export type ReducerMethod<
  State,
  ReducerAction extends Action<ActionType> = Action<ActionType>,
  ActionType extends string = ReducerAction['type']
> = (state: Draft<State>, action: ReducerAction) => void | State;

export interface IKeyableReducer<
  State,
  ReducerAction extends Action<ActionType> = Action<ActionType>,
  ActionType extends string = ReducerAction['type']
> {
  type: ActionType;
  reducer: ReducerMethod<State, ReducerAction>;
}

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
  ...keyableReducers: Array<IKeyableReducer<State>>
) => (baseState: State = defaultState, action: Action): State => {
  let res: State | void;
  res = find(keyableReducers, (reducer: IKeyableReducer<State>) => {
    if (reducer.type === action.type) {
      return immer<State, void | State>(baseState, state => {
        return reducer.reducer(state, action);
      });
    }
  }) as State | void;
  return res || baseState;
};
