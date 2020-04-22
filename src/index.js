import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // custom css
import App from './App'; // App.js is where we create the front end app
import * as serviceWorker from './serviceWorker';

// We load our app into our element root
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);


