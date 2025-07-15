// src/main.jsx (ou src/main.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ou App.tsx
import './index.css'; // ESTA LINHA É CRUCIAL E DEVE APONTAR PARA O FICHEIRO NA MESMA PASTA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);