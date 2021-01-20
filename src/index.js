import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Router from './router';
import store from './store';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
