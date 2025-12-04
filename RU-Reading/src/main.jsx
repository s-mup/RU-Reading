import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home'; // Make sure this imports the NEW App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);