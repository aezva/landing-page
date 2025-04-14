import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import './index.css';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('nia-chat-widget');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ChatWidget />
      </React.StrictMode>
    );
  } else {
    console.error('No se encontró el elemento #nia-chat-widget');
  }
}); 