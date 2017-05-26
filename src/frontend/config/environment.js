/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dough-flow',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.firebase = {
    apiKey: 'AIzaSyABT94xsHT7c_qYhDDyT4kEAYfXtm-s0iA',
    authDomain: 'dough-flow.firebaseapp.com',
    databaseURL: 'ws://localhost.firebaseio.test:5555',
    storageBucket: 'dough-flow.appspot.com.appspot.com',
  };

  // allow fetching fonts from google fonts -- the internet told me to do this
  // http://miguelcobain.github.io/ember-paper/release-1/#/ "Content Security Policy"
  ENV.contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self' 'unsafe-inline'",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src': "'self' fonts.gstatic.com",
  'connect-src': "'self'",
  'img-src': "'self' data:",
  'media-src': "'self'"
};

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.firebase.databaseURL = 'https://dough-flow.firebaseio.com';
  }

  return ENV;
};
