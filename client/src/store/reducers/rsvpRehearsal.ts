import { Endpoints } from '../../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { RsvpRehearsalActionSet } from '../actions/rsvpRehearsal';
import { getRelationshipsCount } from '../selectors/user';
import { CacheStatus, initialState, State } from '../stateDefinition';

export const rsvpRehearsalRequestReducer = createKeyableRequestReducer<
  State,
  RsvpRehearsalActionSet
>(
  Endpoints.RSVP_REHEARSAL,
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
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.PERSISTING;
      state.relationships[relationshipIndex].attendingRehearsal = rsvp;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.PERSISTING;
      state.user.attendingRehearsal = rsvp;
    }
  }
);

export const rsvpRehearsalSuccessReducer = createKeyableSuccessReducer<
  State,
  RsvpRehearsalActionSet
>(
  Endpoints.RSVP_REHEARSAL,
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
      state.relationshipsCacheStatus[relationshipIndex] =
        CacheStatus.UP_TO_DATE;
      state.redirect =
        relationshipIndex < getRelationshipsCount(state) - 1
          ? `/rsvp/u/${relationshipIndex + 1}`
          : '/rsvp/review';
    } else {
      state.userCacheStatus = CacheStatus.UP_TO_DATE;
      state.redirect =
        getRelationshipsCount(state) > 0 ? '/rsvp/u/0' : '/rsvp/review';
    }
  }
);

export const rsvpRehearsalFailureReducer = createKeyableFailureReducer<
  State,
  RsvpRehearsalActionSet
>(
  Endpoints.RSVP_REHEARSAL,
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

export const rsvpRehearsalRootReducer = combineKeyableRsaaReducers<State>(
  initialState
)(
  rsvpRehearsalRequestReducer,
  rsvpRehearsalSuccessReducer,
  rsvpRehearsalFailureReducer
);
