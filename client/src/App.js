import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import PeopleView from './containers/PeopleView';

import './App.css';


const App = () => (
  <div className="app">
    <Header />
    <PeopleView />
    <ToastContainer
      autoClose={2000}
      closeButton={false}
      hideProgressBar
    />
  </div>
);

export default App;
