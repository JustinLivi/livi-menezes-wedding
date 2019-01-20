import { Endpoints } from '../../common';
import { createKeyableReducer } from '../../Util/createKeyableReducer';
import {
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
import { CacheStatus, State } from '../stateDefinition';

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
      state.relationshipsCacheStatus = CacheStatus.PERSISTING;
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
      state.relationshipsCacheStatus = CacheStatus.UP_TO_DATE;
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
      state.relationshipsCacheStatus = CacheStatus.ERRORED;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.ERRORED;
    }
  }
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