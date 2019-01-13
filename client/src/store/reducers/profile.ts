import {
  combineKeyableRsaaReducers,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { FetchProfileActionSet } from '../actions/profile';
import { Endpoints } from '../endpoints';
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

export const profile = combineKeyableRsaaReducers<ProfileState>({
  cacheStatus: CacheStatus.BEHIND
})(getProfileRequestReducer, getProfileSuccessReducer);
