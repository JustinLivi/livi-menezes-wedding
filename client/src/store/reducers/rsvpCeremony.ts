import { Endpoints } from '../../common';
import {
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { RsvpCeremonyActionSet } from '../actions/rsvpCeremony';
import { CacheStatus, State } from '../stateDefinition';

export const rsvpCeremonyRequestReducer = createKeyableRequestReducer<
  State,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', (state, { meta: { body } }) => {
  state.userCacheStatus = CacheStatus.PERSISTING;
  if (state.user) {
    state.user.attendingWedding = body.rsvp;
  }
});

export const rsvpCeremonySuccessReducer = createKeyableSuccessReducer<
  State,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', state => {
  state.userCacheStatus = CacheStatus.UP_TO_DATE;
});

export const rsvpCeremonyFailureReducer = createKeyableFailureReducer<
  State,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', state => {
  state.userCacheStatus = CacheStatus.ERRORED;
});
