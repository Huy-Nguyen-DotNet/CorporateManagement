import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/all.min.css'; // Import Font Awesome CSS
import './css/slick.css'; // Import Slick CSS
import './css/simple-line-icons.css'; // Import Simple Line Icons CSS
import './css/style.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
