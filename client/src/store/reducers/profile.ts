import { Endpoints } from '../../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { FetchProfileActionSet } from '../actions/profile';
import { RsvpCeremonyActionSet } from '../actions/rsvpCeremony';
import { CacheStatus, ProfileState } from '../stateDefinition';

const getProfileRequestReducer = createKeyableRequestReducer<
  ProfileState,
  FetchProfileActionSet
>(Endpoints.GET_BY_PROFILE_ID, 'GET', state => {
  state.cacheStatus = CacheStatus.FETCHING;
});

const getProfileSuccessReducer = createKeyableSuccessReducer<
  ProfileState,
  FetchProfileActionSet
>(Endpoints.GET_BY_PROFILE_ID, 'GET', (state, { payload }) => {
  state.cacheStatus = CacheStatus.UP_TO_DATE;
  state.data = payload;
});

const getProfileFailureReducer = createKeyableFailureReducer<
  ProfileState,
  FetchProfileActionSet
>(Endpoints.GET_BY_PROFILE_ID, 'GET', state => {
  state.cacheStatus = CacheStatus.ERRORED;
});

const rsvpCeremonyRequestReducer = createKeyableRequestReducer<
  ProfileState,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', (state, { meta: { body } }) => {
  state.cacheStatus = CacheStatus.PERSISTING;
  if (state.data) {
    state.data.attendingWedding = body.rsvp;
  }
});

const rsvpCeremonySuccessReducer = createKeyableSuccessReducer<
  ProfileState,
  RsvpCeremonyActionSet
>(Endpoints.RSVP_CEREMONY, 'POST', state => {
  state.cacheStatus = CacheStatus.UP_TO_DATE;
});

export const profile = combineKeyableRsaaReducers<ProfileState>({
  cacheStatus: CacheStatus.BEHIND
})(
  getProfileRequestReducer,
  getProfileSuccessReducer,
  getProfileFailureReducer,
  rsvpCeremonyRequestReducer,
  rsvpCeremonySuccessReducer
);
