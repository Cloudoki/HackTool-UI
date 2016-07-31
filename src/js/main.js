var pathname = window.location.pathname;

require.config({

  baseUrl : pathname+'js',
  shim: {
      bootstrap: {
        deps: ['jquery'],
        exports: 'bootstrap'
      }
  },

  paths: {
      "jquery": pathname+"vendor/jquery/dist/jquery.min",
      "backbone": pathname+"vendor/backbone/backbone-min",
      "requirejs": pathname+"vendor/requirejs/require",
      "underscore": pathname+"vendor/underscore/underscore-min",
      "mustache": pathname+"vendor/mustache.js/mustache",
      "bootstrap": pathname+"vendor/bootstrap/dist/js/bootstrap.min",
      "simplemde": pathname+"vendor/simplemde/dist/simplemde.min",
      "markdown": pathname+"vendor/markdown/lib/markdown"
  },

  urlArgs: "bust=" +  (new Date()).getTime()
});

var Application;

require(
  ['backbone', 'Application', 'bootstrap', 'Utilities/hacktool.sdk'],
  function(Backbone, application, Bootstrap, hacktool)
  {
    $(document).ready(function()
    {
      Application = application;
      Application.init();

    });
  }
);
