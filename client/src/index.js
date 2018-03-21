import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './services/store/configureStore';


ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
