/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'zahid-staging',
    environment: environment,
    baseURL: '/',
    //locationType: 'auto',

    contentSecurityPolicy: {
      'default-src': "'self' *",
      'script-src': "'self'  'unsafe-inline' *",
      'font-src': "'self'  data: http://fonts.gstatic.com https://fonts.googleapis.com   * ",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com  * ",
      'connect-src': "'self' *",
      'media-src': "'self' *",
      'img-src' : "'self' data: http://fonts.gstatic.com *"
    },


    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  ENV['simple-auth-devise'] = {
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
    serverTokenEndpoint:  ENV.APP.host  + '/users/sign_in',
    authorizer: 'devise',
    crossOriginWhitelist: ['*'],
  };

ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated: 'dashboard'
  };

  if (environment === 'development') {
    ENV.APP.host =  'http://localhost:3000';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.APP.host =  'http://zahid-rails.herokuapp.com';
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.host =  'http://zahid-rails.herokuapp.com';

  }

  return ENV;
};
