import immer, { Draft } from 'immer';
import { find, get, reduce } from 'lodash';
import { Action } from 'redux';
import { ApiError, HttpMethod } from 'redux-api-middleware';

import { API_ROOT } from '../config';
import {
  BaseRsaaAction,
  BaseRsaaMeta,
  configureRsaaActionCreatorFactory,
  createRsaaActionCreatorFactory,
  RsaaMeta,
} from './rsaaActionCreatorFactory';

export enum RsaaActionType {
  RSAA_REQUEST = 'RSAA_REQUEST',
  RSAA_SUCCESS = 'RSAA_SUCCESS',
  RSAA_FAILURE = 'RSAA_FAILURE'
}

export interface RsaaRequestAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_REQUEST;
  meta: Meta;
  error?: boolean;
}

export interface RsaaSuccessAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_SUCCESS;
  meta: Meta;
  payload: Payload;
}

export interface RsaaFailureAction<
  Meta extends RsaaMeta<Method, Endpoint>,
  Payload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> extends BaseRsaaAction {
  type: RsaaActionType.RSAA_FAILURE;
  meta: Meta;
  payload: ApiError<Payload>;
}

export type RsaaActionSet<
  Meta extends RsaaMeta<Method, Endpoint>,
  SuccessPayload,
  FailurePayload,
  Method extends HttpMethod = Meta['method'],
  Endpoint = Meta['endpoint']
> =
  | RsaaRequestAction<Meta, Method, Endpoint>
  | RsaaSuccessAction<Meta, SuccessPayload, Method, Endpoint>
  | RsaaFailureAction<Meta, FailurePayload, Method, Endpoint>;

type AnyRsaaActionSet = RsaaActionSet<any, any, any>;

export type ExtractRequestAction<
  A extends AnyRsaaActionSet
> = A extends RsaaRequestAction<infer Meta>
  ? RsaaRequestAction<A['meta'], A['meta']['method'], A['meta']['endpoint']>
  : never;

export type ExtractSuccessAction<
  A extends AnyRsaaActionSet
> = A extends RsaaSuccessAction<infer Meta, infer Payload>
  ? RsaaSuccessAction<
      A['meta'],
      A['payload'],
      A['meta']['method'],
      A['meta']['endpoint']
    >
  : never;

export type ExtractFailureAction<
  A extends AnyRsaaActionSet
> = A extends RsaaFailureAction<infer Meta, infer Payload>
  ? RsaaFailureAction<
      A['meta'],
      A['payload']['response'],
      A['meta']['method'],
      A['meta']['endpoint']
    >
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

export interface KeyableRequestReducer<
  State,
  RequestAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_REQUEST;
  endpoint: RequestAction['meta']['endpoint'];
  method: RequestAction['meta']['method'];
  reducer: KeyableRequestReducerMethod<State, RequestAction>;
}

export interface KeyableSuccessReducer<
  State,
  SuccessAction extends AnyRsaaActionSet
> {
  type: RsaaActionType.RSAA_SUCCESS;
  endpoint: SuccessAction['meta']['endpoint'];
  method: SuccessAction['meta']['method'];
  reducer: KeyableSuccessReducerMethod<State, SuccessAction>;
}

export interface KeyableFailureReducer<
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
  | KeyableRequestReducer<State, RsaaAction>
  | KeyableSuccessReducer<State, RsaaAction>
  | KeyableFailureReducer<State, RsaaAction>;

export const createKeyableRequestReducer = <
  State,
  ReducerAction extends AnyRsaaActionSet
>(
  endpoint: ReducerAction['meta']['endpoint'],
  method: ReducerAction['meta']['method'],
  reducer: KeyableRequestReducerMethod<State, ReducerAction>
): KeyableRequestReducer<State, ReducerAction> => ({
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
): KeyableSuccessReducer<State, ReducerAction> => ({
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
): KeyableFailureReducer<State, ReducerAction> => ({
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
  let res: State | undefined;
  find(keyableReducers, (reducer: KeyableRsaaReducer<State>) => {
    if (
      reducer.type === action.type &&
      reducer.endpoint === get(action, 'meta.endpoint') &&
      reducer.method === get(action, 'meta.method')
    ) {
      res = immer<State, void | State>(baseState, state => {
        return (reducer.reducer as any)(state, action);
      }) as State;
      return true;
    }
  });
  return res || baseState;
};

export const rsaaActionCreatorFactory = configureRsaaActionCreatorFactory<
  BaseRsaaMeta
>(factoryParams => {
  const { method, endpoint, params } = factoryParams;
  return {
    endpoint: `${API_ROOT}${reduce(
      params,
      (result, value, key) => result.replace(`:${key}`, value),
      endpoint
    )}`,
    method,
    types: [
      {
        meta: factoryParams,
        type: RsaaActionType.RSAA_REQUEST
      },
      {
        meta: factoryParams,
        type: RsaaActionType.RSAA_SUCCESS
      },
      {
        meta: factoryParams,
        type: RsaaActionType.RSAA_FAILURE
      }
    ]
  };
});

export const createRsaaActionCreator = createRsaaActionCreatorFactory(
  rsaaActionCreatorFactory
);
