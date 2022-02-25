import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.hydrate(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
