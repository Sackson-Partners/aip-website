import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import ConfigurationValidator from '@/components/ConfigurationValidator';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigurationValidator>
    <App />
  </ConfigurationValidator>
);