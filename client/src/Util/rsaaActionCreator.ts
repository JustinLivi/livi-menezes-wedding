import immer, { Draft } from 'immer';
import { find, get } from 'lodash';
import { Action } from 'redux';
import { ApiError, HttpMethod } from 'redux-api-middleware';

import {
  configureRsaaActionCreatorFactory,
  createRsaaActionCreatorFactory,
  IBaseRsaaAction,
  IBaseRsaaMeta,
} from './rsaaActionCreatorFactory';

export enum RsaaActionType {
  RSAA_REQUEST = 'RSAA_REQUEST',
  RSAA_SUCCESS = 'RSAA_SUCCESS',
  RSAA_FAILURE = 'RSAA_FAILURE'
}

export interface IRsaaMeta<Method extends HttpMethod, Endpoint extends string> {
  endpoint: Endpoint;
  method: Method;
}

export interface IRsaaRequestAction<
  Meta extends IRsaaMeta<Method, Endpoint>,
  Method extends HttpMethod = Meta['method'],
  Endpoint extends string = Meta['endpoint']
> extends IBaseRsaaAction {
  type: RsaaActionType.RSAA_REQUEST;
  meta: Meta;
  error?: boolean;
}

export interface IRsaaSuccessAction<
  Meta extends IRsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint extends string = Meta['endpoint']
> extends IBaseRsaaAction {
  type: RsaaActionType.RSAA_SUCCESS;
  meta: Meta;
  payload: Payload;
}

export interface IRsaaFailureAction<
  Meta extends IRsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint extends string = Meta['endpoint']
> extends IBaseRsaaAction {
  type: RsaaActionType.RSAA_SUCCESS;
  meta: Meta;
  payload: ApiError<Payload>;
}

export type RsaaActionSet<
  Meta extends IRsaaMeta<Method, Endpoint>,
  SuccessPayload,
  FailurePayload,
  Method extends HttpMethod = Meta['method'],
  Endpoint extends string = Meta['endpoint']
> =
  | IRsaaRequestAction<Meta>
  | IRsaaSuccessAction<Meta, SuccessPayload>
  | IRsaaFailureAction<Meta, FailurePayload>;

type AnyRsaaActionSet = RsaaActionSet<any, any, any>;

export type ExtractRequestAction<
  A extends AnyRsaaActionSet
> = A extends IRsaaRequestAction<infer Meta> ? IRsaaRequestAction<Meta> : never;

export type ExtractSuccessAction<
  A extends AnyRsaaActionSet
> = A extends IRsaaSuccessAction<infer Meta, infer Payload>
  ? IRsaaSuccessAction<Meta, Payload>
  : never;

export type ExtractFailureAction<
  A extends AnyRsaaActionSet
> = A extends IRsaaFailureAction<infer Meta, infer Payload>
  ? IRsaaFailureAction<Meta, Payload>
  : never;

export type KeyableRequestReducerMethod<
  State,
  RequestAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractRequestAction<RequestAction>
) => void | State;

export type KeyableSuccessReducerMethod<
  State,
  SuccessAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractSuccessAction<SuccessAction>
) => void | State;

export type KeyableFailureReducerMethod<
  State,
  FailureAction extends AnyRsaaActionSet
> = (
  state: Draft<State>,
  action: ExtractFailureAction<FailureAction>
) => void | State;

export interface IKeyableRequestReducer<
  State,
  RequestAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_REQUEST;
  endpoint: RequestAction['meta']['endpoint'];
  method: RequestAction['meta']['method'];
  reducer: KeyableRequestReducerMethod<State, RequestAction>;
}

export interface IKeyableSuccessReducer<
  State,
  SuccessAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_SUCCESS;
  endpoint: SuccessAction['meta']['endpoint'];
  method: SuccessAction['meta']['method'];
  reducer: KeyableSuccessReducerMethod<State, SuccessAction>;
}

export interface IKeyableFailureReducer<
  State,
  FailureAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_FAILURE;
  endpoint: FailureAction['meta']['endpoint'];
  method: FailureAction['meta']['method'];
  reducer: KeyableFailureReducerMethod<State, FailureAction>;
}

export type KeyableRsaaReducer<
  State,
  RsaaAction extends AnyRsaaActionSet = any
> =
  | IKeyableRequestReducer<State, RsaaAction>
  | IKeyableSuccessReducer<State, RsaaAction>
  | IKeyableFailureReducer<State, RsaaAction>;

export const createKeyableRequestReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableRequestReducerMethod<State, ReducerAction>
): IKeyableRequestReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_REQUEST
});

export const createKeyableSuccessReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableSuccessReducerMethod<State, ReducerAction>
): IKeyableSuccessReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_SUCCESS
});

export const createKeyableFailureReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableFailureReducerMethod<State, ReducerAction>
): IKeyableFailureReducer<State, ReducerAction> => ({
  endpoint,
  method,
  reducer,
  type: RsaaActionType.RSAA_FAILURE
});

export const combineKeyableRsaaReducers = <State = never>(
  defaultState: State
) => (...keyableReducers: Array<KeyableRsaaReducer<State>>) => (
  baseState: State = defaultState,
  action: Action
): State => {
  let res: State | void;
  res = find(keyableReducers, (reducer: KeyableRsaaReducer<State>) => {
    if (
      reducer.type === action.type &&
      reducer.endpoint === get(action, 'meta.endpoint') &&
      reducer.method === get(action, 'meta.method')
    ) {
      return immer<State, void | State>(baseState, state => {
        return (reducer.reducer as any)(state, action);
      });
    }
  }) as State | void;
  return res || baseState;
};

export const rsaaActionCreatorFactory = configureRsaaActionCreatorFactory<
  IBaseRsaaMeta
>(params => {
  const { method, endpoint } = params;
  return {
    endpoint,
    meta: {
      method
    },
    method,
    types: [
      {
        meta: params,
        type: RsaaActionType.RSAA_REQUEST
      },
      {
        meta: params,
        type: RsaaActionType.RSAA_SUCCESS
      },
      {
        meta: params,
        type: RsaaActionType.RSAA_FAILURE
      }
    ]
  };
});

export const createRsaaActionCreator = createRsaaActionCreatorFactory(
  rsaaActionCreatorFactory
);
