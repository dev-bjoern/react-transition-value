import ReactDOM from 'react-dom/client';
// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as HTMLElement)
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

root.render(app)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
