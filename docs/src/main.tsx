import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/vend-sans/latin.css';
import '@hepta/tokens/css';
import '@hepta/components/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
