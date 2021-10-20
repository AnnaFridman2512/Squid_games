import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App.js';
import reportWebVitals from './reportWebVitals';
import PlayersProvider from '../src/components/PlayersContext.js';

ReactDOM.render(
  <React.StrictMode>
    <PlayersProvider>
    <App />
    </PlayersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
