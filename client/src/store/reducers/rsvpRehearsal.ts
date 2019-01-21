import { Endpoints } from '../../common';
import {
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { RsvpRehearsalActionSet } from '../actions/rsvpRehearsal';
import { getRelationshipsCount } from '../selectors/user';
import { CacheStatus, State } from '../stateDefinition';

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
      state.relationshipsCacheStatus = CacheStatus.PERSISTING;
      state.relationships[relationshipIndex].attendingWedding = rsvp;
    } else if (state.user) {
      state.userCacheStatus = CacheStatus.PERSISTING;
      state.user.attendingWedding = rsvp;
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
      state.relationshipsCacheStatus = CacheStatus.UP_TO_DATE;
      state.redirect =
        relationshipIndex < getRelationshipsCount(state) - 1
          ? `/rsvp/u/${relationshipIndex}`
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
      state.relationshipsCacheStatus = CacheStatus.ERRORED;
    } else {
      state.userCacheStatus = CacheStatus.ERRORED;
    }
  }
);
