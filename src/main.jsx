import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'rsuite/dist/rsuite.min.css';
import App from './App.jsx';
import { CustomProvider } from 'rsuite';

createRoot(document.getElementById('root')).render(
  <CustomProvider>
    <App />
  </CustomProvider>
);
