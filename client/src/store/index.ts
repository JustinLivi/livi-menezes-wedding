import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import { NODE_ENV } from '../config';
import { reducer } from './reducers';
import { initialState } from './stateDefinition';

export const middleware = [apiMiddleware];

if (NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
