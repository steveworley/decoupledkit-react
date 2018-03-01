// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';
import fetch from 'cross-fetch'

// import proxy from 'http-proxy-middleware';

const bundler = webpack(config);

// const serverProxy = proxy('/graphiql', {
//   target: "http://localhost:8082",
//   changeOrigin: false,
//   logLevel: 'debug'
// });

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 8080,
  ui: {
    port: 8081
  },
  server: {
    baseDir: 'src',

    middleware: [

      // This middleware dynamically generates the apitoken.js file that will be
      // used to authenticate against Drupals API. For the demo this will lease a
      // token for every page request and will the tokens are leased indefinitely
      // for production it would make sense to have these use a low lease time so
      // if the token is compromised the API can only be accessed for a short duration.
      //
      // Ideally this would be injected to index.html rather than another script file
      // to reduce the ability for people to remote request it.
      {
        route: '/apitoken.js',
        handle: async (req, res, next) => {
          const body = Object.entries({
            grant_type: 'password',
            client_id: 'ffdff2a7-53d7-408c-865c-67121e597285',
            client_secret: 'apitest',
            username: 'apitest',
            password: 'apitest'
          }).map(([key, val]) => `${key}=${val}`).join('&')

          const response = await fetch('http://local.decoupledkit.com/oauth/token', {
            method: 'post',
            body,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })

          if (response.ok) {
            const token = await response.json()
            res.setHeader('Content-Type', 'text/javascript')
            res.end(`window.apiToken = ${JSON.stringify(token)}`)
          }

          res.end('')
        }
      },

      historyApiFallback(),

      // The order of serverProxy is important. It will not work if it is indexed
      // after the webpackDevMiddleware in this array.
      // serverProxy,

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },

        // for other settings see
        // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
