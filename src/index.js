import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Components/Game';
import reportWebVitals from './reportWebVitals';
import {createStore}  from 'redux';
import { Provider } from 'react-redux';
import { store } from './Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
  store={store}><Game/></Provider>
  
  
);

reportWebVitals();
