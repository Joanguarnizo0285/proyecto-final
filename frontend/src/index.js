import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa el componente App

// Obtiene el elemento del DOM con el id "root" (definido en index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del elemento "root"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);