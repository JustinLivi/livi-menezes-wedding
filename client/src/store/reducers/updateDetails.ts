import { Endpoints } from '../../common';
import { createKeyableReducer } from '../../Util/createKeyableReducer';
import {
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { CHANGE_DETAILS, ChangeDetailsAction, UpdateDetailsActionSet } from '../actions/updateDetails';
import { CacheStatus, State } from '../stateDefinition';

export const updateDetailsRequestReducer = createKeyableRequestReducer<
  State,
  UpdateDetailsActionSet
>(Endpoints.RSVP_DETAILS, 'POST', (state, { meta: { body } }) => {
  state.userCacheStatus = CacheStatus.PERSISTING;
  if (state.user) {
    state.user = {
      ...state.user,
      ...body
    };
  }
});

export const updateDetailsSuccessReducer = createKeyableSuccessReducer<
  State,
  UpdateDetailsActionSet
>(Endpoints.RSVP_DETAILS, 'POST', state => {
  state.userCacheStatus = CacheStatus.UP_TO_DATE;
});

export const updateDetailsFailureReducer = createKeyableFailureReducer<
  State,
  UpdateDetailsActionSet
>(Endpoints.RSVP_DETAILS, 'POST', state => {
  state.userCacheStatus = CacheStatus.ERRORED;
});

export const changeDetailsReducer = createKeyableReducer<
  State,
  ChangeDetailsAction
>(CHANGE_DETAILS, (state, { updates }) => {
  if (state.user) {
    state.user = {
      ...state.user,
      ...updates
    };
  }
});
