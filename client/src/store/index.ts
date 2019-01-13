import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import { reducers } from './reducers';
import { CacheStatus } from './stateDefinition';

export const store = createStore(
  reducers,
  {
    profile: {
      cacheStatus: CacheStatus.BEHIND
    }
  },
  composeWithDevTools(applyMiddleware(logger))
);
