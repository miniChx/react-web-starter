// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'PUBLIC_URL': JSON.stringify(publicUrl)
    });
  return {'process.env': processEnv};
}

function getAppConfig() {
  var appConfig = {};
// console.log(process.env);
  var npmArgv = JSON.parse(process && process.env && process.env.npm_config_argv);
  var argsArray = npmArgv && npmArgv.cooked;
  if (argsArray) {
    for(var index=0; index < argsArray.length; index++) {
      var item = argsArray[index];
      if (item === '--host') {
        appConfig.host = argsArray[index + 1];
      }
      if (item === '--processPath') {
        appConfig.processPath = argsArray[index + 1];
      }
    }

    if (!appConfig.processPath && appConfig.host) {
      appConfig.processPath = appConfig.host
    }
  } else {
    console.log('no host insert!!!');
  }

  return appConfig;
}


module.exports = {
  getAppConfig: getAppConfig,
  getClientEnvironment: getClientEnvironment
};


