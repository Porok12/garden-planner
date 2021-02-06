import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* TODO:
    - plant combination
    - search by name
    - search by characteristics
    - search by genus
    - calendar
*/

/* TODO: search
    - Plant Habit (Herb/Forb, Shurb, Three, Cactus/Succulent, Grass/Grass-like, Fern, Vine)
    - Life cycle (annual, ...)
    - Sun requirements
    - Water Preferences
    - Soil pH Preferences
    - minimum cold hardiness
    - maximum recommended zone
    - height
    - spread
    - leaves
    - fruit
    - fruiting time
    - flowers
    - flower color
    - uses
    - edible parts
    - eating methods
*/
