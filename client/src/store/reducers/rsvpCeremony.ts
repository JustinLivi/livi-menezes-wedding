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
        params: { relationshipIndex }
      }
    }
  ) => {
    state.swipe = rsvp ? 'right' : 'left';
    if (
      relationshipIndex !== undefined &&
      state.relationships &&
      state.relationships[relationshipIndex]
    ) {
      state.relationshipsCacheStatus = CacheStatus.PERSISTING;
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
        params: { relationshipIndex }
      }
    }
  ) => {
    if (relationshipIndex !== undefined) {
      state.relationshipsCacheStatus = CacheStatus.UP_TO_DATE;
      state.redirect = `/rsvp/details/${relationshipIndex}`;
    } else {
      state.userCacheStatus = CacheStatus.UP_TO_DATE;
      state.redirect = '/rsvp/details';
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
      state.relationshipsCacheStatus = CacheStatus.ERRORED;
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
