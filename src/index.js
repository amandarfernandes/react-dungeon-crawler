import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import { batchDispatchMiddleware } from 'redux-batched-actions';
const middleware = [batchDispatchMiddleware, thunk];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
