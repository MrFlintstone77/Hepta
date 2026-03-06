import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@pariogo/tokens/css';
import '@pariogo/components/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
