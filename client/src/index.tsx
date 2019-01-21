import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';

const $root = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>,
  $root
);
// tslint:disable-next-line:no-console
console.log($root);
if ($root) {
  $root.scrollTo(0, 100);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
