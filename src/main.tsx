import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/scrollbar.css';
import './index.css';

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
} else {
  try {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: red;">Error loading application. Check console for details.</div>';
  }
}