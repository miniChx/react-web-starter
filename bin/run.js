
/* eslint-disable */

const path = require('path');
const fs = require('fs');
const del = require('del');
const ejs = require('ejs');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


// TODO: Update configuration settings
const config = {
  title: 'React Starter Boilerplate',       // Your website title
  url: 'https://rsb.kriasoft.com',          // Your website URL
  project: 'react-starter-boilerplate',     // Firebase project. See README.md -> How to Deploy
  trackingID: 'UA-XXXXX-Y',                 // Google Analytics Site's ID
};

const tasks = new Map(); // The collection of automation tasks ('clean', 'build', 'publish', etc.)

function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve()
    .then(() => tasks.get(task)())
    .then(() => {
      console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
    }, err => console.error(err.stack));
}

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', () => del([path.join(__dirname, '../build/dist/*'), path.join(__dirname, '!../build/dist/.git')], { dot: true }));

//
// Copy ./index.html into the /public folder
// -----------------------------------------------------------------------------
tasks.set('html', () => {
  const webpackConfig = require('../config/webpack.config');
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../build/dist/assets.json'), 'utf8'));
  const template = fs.readFileSync(path.join(__dirname, '../src/public/index.ejs'), 'utf8');
  const render = ejs.compile(template, { filename: path.join(__dirname, '../src/public/index.ejs') });
  const output = render({ debug: webpackConfig.debug, bundle: assets.main.js, config });
  fs.writeFileSync(path.join(__dirname, '../build/index.html'), output, 'utf8');
});

//
// Generate sitemap.xml
// -----------------------------------------------------------------------------
tasks.set('sitemap', () => {
  const urls = require('../src/routes.json')
    .filter(x => !x.path.includes(':'))
    .map(x => ({ loc: x.path }));
  const template = fs.readFileSync(path.join(__dirname, '../src/public/sitemap.ejs'), 'utf8');
  const render = ejs.compile(template, { filename: path.join(__dirname, '../src/public/sitemap.ejs') });
  const output = render({ config, urls });
  fs.writeFileSync(path.join(__dirname, '../build/sitemap.xml'), output, 'utf8');
});

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', () => {
  const webpackConfig = require('../config/webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => Promise.resolve()
  .then(() => run('clean'))
  .then(() => run('bundle'))
  .then(() => run('html'))
  .then(() => run('sitemap'))
);

//
// Build and publish the website
// -----------------------------------------------------------------------------
tasks.set('publish', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  return run('build')
    .then(() => firebase.login({ nonInteractive: false }))
    .then(() => firebase.deploy({
      project: config.project,
      cwd: __dirname,
    }))
    .then(() => { setTimeout(() => process.exit()); });
});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () => {
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  const template = fs.readFileSync(path.join(__dirname, '../src/public/index.ejs'), 'utf8');
  const render = ejs.compile(template, { filename: path.join(__dirname, '../src/public/index.ejs') });
  const output = render({ debug: true, bundle: './dist/main.js', config });
  fs.writeFileSync(path.join(__dirname, '../build/index.html'), output, 'utf8');
  const webpackConfig = require('../config/webpack.config');
  const bundler = webpack(webpackConfig);
  return new Promise(resolve => {
    browserSync({
      server: {
        baseDir: 'build',

        middleware: [
          webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: webpackConfig.output.publicPath,

            // pretty colored output
            stats: webpackConfig.stats,

            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
          }),

          // bundler should be the same as above
          webpackHotMiddleware(bundler),

          // Serve index.html for all unknown requests
          (req, res, next) => {
            if (req.headers.accept.startsWith('text/html')) {
              req.url = '/index.html'; // eslint-disable-line no-param-reassign
            }
            next();
          },
        ],
      },

      // no need to watch '*.js' here, webpack will take care of it for us,
      // including full page reloads if HMR won't work
      files: [
        path.join(__dirname, '../src/**/*.css'),
        path.join(__dirname, '../src/**/*.html'),
      ],
    });

    resolve();
  });
});

// Execute the specified task or default one. E.g.: node run build
run(process.argv[2] || 'start');
