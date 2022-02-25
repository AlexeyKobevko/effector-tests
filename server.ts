import fs from 'fs';
import path from 'path';
import express, { Express, Request, RequestHandler } from 'express';
import { createServer as createViteServer } from 'vite';
import serveStatic from 'serve-static';
import compression from 'compression';
import { ServerResponse } from 'http';
import cookiesMiddleware from 'universal-cookie-express';

const createServer = async (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) => {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd ? fs.readFileSync(resolve('./client/index.html'), 'utf-8') : '';

  const app: Express = express();
  app.use(cookiesMiddleware());

  app.use(express.json() as RequestHandler);
  app.use(express.urlencoded({ extended: true }) as RequestHandler);

  let vite: any;

  if (!isProd) {
    vite = await createViteServer({
      root,
      server: {
        middlewareMode: 'ssr',
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    const requestHandler = serveStatic<ServerResponse>(resolve('./client'), {
      index: false,
    }) as RequestHandler;
    app.use(requestHandler);
  }

  app.use('*', async (req: Request, res) => {
    try {
      const url = req.originalUrl;

      const sub = url.endsWith('/') && url.substring(0, url.length - 1);

      const isParams = url.split(`?`).length > 1 || url[0] === '?';
      if (!isParams && !url.endsWith('/')) {
        res.redirect(301, `${req.originalUrl}/`);
        res.end();
      } else if (isParams && sub) {
        res.redirect(301, `${sub}`);
        res.end();
      } else {
        let template;
        let render;
        if (!isProd) {
          // always read fresh template in dev
          template = fs.readFileSync(resolve('index.html'), 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
        } else {
          template = indexProd;
          const entryServer = require('./server/entry-server.js');
          render = entryServer.render;
        }
        const helmetContext: any = {};

        const appHtml = render(req, req.originalUrl, {}, helmetContext);

        const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

        const helmet = helmetContext.helmet;

        res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .end(
            html
              .replace("lang='ru'>", `${helmet.htmlAttributes.toString()}>`)
              .replace(
                '</head>',
                // eslint-disable-next-line max-len
                `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()} ${helmet.style.toString()} ${helmet.script.toString()} ${helmet.noscript.toString()}</head>`
              )
              .replace('<body>', `<body ${helmet.bodyAttributes.toString()}>`)
          );
      }
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      // eslint-disable-next-line no-console
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
};

createServer().then(({ app }) => {
  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`App is listening on http://localhost:${port}`);
  });
});

// for test use
export { createServer };
