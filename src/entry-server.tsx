import React from 'react';
import { Request } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './app';
import { StaticRouterContext } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider, ProviderProps } from 'react-helmet-async';

interface ReqType extends Request {
  universalCookies: any;
}

export function render(
  req: ReqType,
  url: string,
  context: StaticRouterContext,
  helmetContext: ProviderProps
) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <CookiesProvider cookies={req.universalCookies}>
        <StaticRouter location={url} context={context}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
}
