import {
  combineKeyableRsaaReducers,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { IGetProfileActionSet } from '../actions';
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
>(Endpoints.GET_BY_PROFILE_ID, 'GET', state => {
  state.cacheStatus = CacheStatus.FETCHING;
});

export const profile = combineKeyableRsaaReducers<IProfile>({
  cacheStatus: CacheStatus.BEHIND
})(getProfileRequestReducer, getProfileSuccessReducer);
