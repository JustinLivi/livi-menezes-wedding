import reduceReducers from 'reduce-reducers';

import { Endpoints } from '../../common';
import { combineKeyableReducers, createKeyableReducer } from '../../Util/createKeyableReducer';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import {
  CHANGE_DETAILS,
  CHANGE_DETAILS_RELATION,
  ChangeDetailsAction,
  ChangeDetailsRelationAction,
  UpdateDetailsActionSet,
} from '../actions/updateDetails';
import { CacheStatus, initialState, State } from '../stateDefinition';

export const updateDetailsRequestReducer = createKeyableRequestReducer<
  State,
  UpdateDetailsActionSet
>(
  Endpoints.RSVP_DETAILS,
  'POST',
  (
    state,
    {
      meta: {
        body,
        params: { relationshipIndex }
      }
    }
  ) => {
    if (
      relationshipIndex !== undefined &&
      state.relationships &&
      state.relationships[relationshipIndex]
    ) {
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.PERSISTING;
      state.relationships[relationshipIndex] = {
        ...state.relationships[relationshipIndex],
        ...body
      };
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.PERSISTING;
      state.user = {
        ...state.user,
        ...body
      };
    }
  }
);

export const updateDetailsSuccessReducer = createKeyableSuccessReducer<
  State,
  UpdateDetailsActionSet
>(
  Endpoints.RSVP_DETAILS,
  'POST',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      }
    }
  ) => {
    if (
      relationshipIndex !== undefined &&
      state.relationships &&
      state.relationships[relationshipIndex]
    ) {
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.UP_TO_DATE;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.UP_TO_DATE;
    }
  }
);

export const updateDetailsFailureReducer = createKeyableFailureReducer<
  State,
  UpdateDetailsActionSet
>(
  Endpoints.RSVP_DETAILS,
  'POST',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      }
    }
  ) => {
    if (
      relationshipIndex !== undefined &&
      state.relationships &&
      state.relationships[relationshipIndex]
    ) {
      state.relationshipsCacheStatus[relationshipIndex] = CacheStatus.ERRORED;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.ERRORED;
    }
  }
);

export const updateDetailsApiRootReducer = combineKeyableRsaaReducers<State>(
  initialState
)(
  updateDetailsRequestReducer,
  updateDetailsSuccessReducer,
  updateDetailsFailureReducer
);

export const changeDetailsReducer = createKeyableReducer<
  State,
  ChangeDetailsAction
>(CHANGE_DETAILS, (state, { payload }) => {
  if (state.user) {
    state.user = {
      ...state.user,
      ...payload
    };
  }
});

export const changeDetailsRelationReducer = createKeyableReducer<
  State,
  ChangeDetailsRelationAction
>(CHANGE_DETAILS_RELATION, (state, { payload, meta: { relationIndex } }) => {
  if (state.relationships && state.relationships[relationIndex]) {
    state.relationships[relationIndex] = {
      ...state.relationships[relationIndex],
      ...payload
    };
  }
});

export const updateDetailsStandardRootReducer = combineKeyableReducers<State>(
  initialState
)(changeDetailsReducer, changeDetailsRelationReducer);

export const updateDetailsRootReducer = reduceReducers<State>(
  updateDetailsApiRootReducer,
  updateDetailsStandardRootReducer
);
