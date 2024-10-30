import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// normalmente en javascript
//const root = ReactDOM.createRoot(document.getElementById('root'));

//para typescript
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);


// Usar el nuevo método render de createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

