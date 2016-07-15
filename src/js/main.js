var pathname = window.location.pathname;

require.config({

  baseUrl : pathname+'js',
  shim: {
      bootstrap: {
        deps: ['jquery'],
        exports: 'bootstrap'
      },
    backgrid: {
      deps: ['jquery','backbone','underscore'],
      exports: 'Backgrid'
    }
  },

  paths: {
      "jquery": pathname+"vendor/jquery/dist/jquery.min",
      "backbone": pathname+"vendor/backbone/backbone-min",
      "requirejs": pathname+"vendor/requirejs/require",
      "underscore": pathname+"vendor/underscore/underscore-min",
      "mustache": pathname+"vendor/mustache.js/mustache",
      "bootstrap": pathname+"vendor/bootstrap/dist/js/bootstrap.min"
  },

  urlArgs: "bust=" +  (new Date()).getTime()
});

var Application;

require(
  ['backbone', 'Application', 'bootstrap', 'Utilities/hacktool.sdk', 'config'],
  function(Backbone, application, Bootstrap, hacktool, config)
  {
    $(document).ready(function()
    {
      hacktoolSdk.config(config);

      Application = application;
      Application.init();

    });
  }
);
