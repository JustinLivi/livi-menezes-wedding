import { Endpoints } from '../../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { RsvpCeremonyActionSet } from '../actions/rsvpCeremony';
import { CacheStatus, initialState, State } from '../stateDefinition';

export const rsvpCeremonyRequestReducer = createKeyableRequestReducer<
  State,
  RsvpCeremonyActionSet
>(
  Endpoints.RSVP_CEREMONY,
  'POST',
  (
    state,
    {
      meta: {
        body: { rsvp },
        params: { relationshipIndex, noRedirect }
      }
    }
  ) => {
    state.swipe = noRedirect ? undefined : rsvp ? 'right' : 'left';
    if (
      relationshipIndex !== undefined &&
      state.relationships &&
      state.relationships[relationshipIndex]
    ) {
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.PERSISTING;
      state.relationships[relationshipIndex].attendingWedding = rsvp;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.PERSISTING;
      state.user.attendingWedding = rsvp;
    }
  }
);

export const rsvpCeremonySuccessReducer = createKeyableSuccessReducer<
  State,
  RsvpCeremonyActionSet
>(
  Endpoints.RSVP_CEREMONY,
  'POST',
  (
    state,
    {
      meta: {
        params: { relationshipIndex, noRedirect }
      }
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.UP_TO_DATE;
      state.redirect = noRedirect
        ? undefined
        : `/rsvp/details/${relationshipIndex}`;
    } else {
      state.userCacheStatus = CacheStatus.UP_TO_DATE;
      state.redirect = noRedirect ? undefined : '/rsvp/details';
    }
  }
);

export const rsvpCeremonyFailureReducer = createKeyableFailureReducer<
  State,
  RsvpCeremonyActionSet
>(
  Endpoints.RSVP_CEREMONY,
  'POST',
  (
    state,
    {
      meta: {
        params: { relationshipIndex }
      }
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus[relationshipIndex] = CacheStatus.ERRORED;
    } else {
      state.userCacheStatus = CacheStatus.ERRORED;
    }
  }
);

export const rsvpCeremonyRootReducer = combineKeyableRsaaReducers<State>(
  initialState
)(
  rsvpCeremonyRequestReducer,
  rsvpCeremonySuccessReducer,
  rsvpCeremonyFailureReducer
);
