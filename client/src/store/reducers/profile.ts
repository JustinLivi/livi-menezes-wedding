import {
  combineKeyableRsaaReducers,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { IGetProfileActionSet } from '../actions/profile';
import { Endpoints } from '../endpoints';
import { CacheStatus, IProfile } from '../stateDefinition';

const getProfileRequestReducer = createKeyableRequestReducer<
  IProfile,
  IGetProfileActionSet
>(Endpoints.GET_BY_PROFILE_ID, 'GET', state => {
  state.cacheStatus = CacheStatus.FETCHING;
});

const getProfileSuccessReducer = createKeyableSuccessReducer<
  IProfile,
  IGetProfileActionSet
>(Endpoints.GET_BY_PROFILE_ID, 'GET', (state, { payload }) => {
  state.cacheStatus = CacheStatus.UP_TO_DATE;
  state.data = payload;
});

export const profile = combineKeyableRsaaReducers<IProfile>({
  cacheStatus: CacheStatus.BEHIND
})(getProfileRequestReducer, getProfileSuccessReducer);