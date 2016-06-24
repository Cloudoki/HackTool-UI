var pathname = window.location.pathname;

require.config({

  baseUrl : pathname+'js',
  shim: {
    facebook : {
      exports: 'FB'
    },
    google : {
      exports: 'gapi'
    },
    bootstrap: {
        deps: [
          'jquery'
        ],
        exports: 'bootstrap'
    },
    slick: {
        deps: ['jquery'],
        exports: 'jQuery.fn.slick'
    },
    fileupload: {
        deps: ['jquery', 'iframetransport', 'jquery.ui.widget'],
        exports: 'jQuery.fn.fileupload'
    },
    chosen: {
      deps: ['jquery'],
      exports: 'jQuery.fn.chosen'
    },
    tagsinput: {
      deps: ['jquery', 'bootstrap'],
      exports: 'jQuery.fn.tagsinput'
    },
    backgrid: {
        deps: ['jquery', 'backbone', 'underscore'],
        exports: 'Backgrid'
    },
    backgrid_paginator: {
        deps: ['jquery', 'backgrid', 'underscore'],
        exports: 'Backgrid.Extension.Paginator'
    },
    "backbone.paginator": {
        deps: ['jquery', 'backbone', 'underscore'],
        exports: 'Backbone.PageableCollection'
    }
  },

  paths: {
    jquery: pathname+'vendor/jquery/dist/jquery.min',
    //facebook: '//connect.facebook.net/en_US/sdk',
    facebook: pathname+'js/Utilities/fb-sdk',
    backbone: pathname+'vendor/backbone/backbone-min',
    requirejs: pathname+'vendor/requirejs/require',
    underscore: pathname+'vendor/underscore/underscore-min',
    mustache: pathname+'vendor/mustache.js/mustache',
    bootstrap: pathname+'vendor/bootstrap/dist/js/bootstrap.min',
    masonry: pathname+'vendor/masonry/dist/masonry.pkgd.min',
    imagesLoaded: pathname+'vendor/imagesloaded/imagesloaded.pkgd.min',
    slick: pathname+'vendor/slick-carousel/slick/slick.min',
    bridget: pathname+'vendor/jquery-bridget/jquery.bridget',
    'jquery.ui.widget':pathname+'vendor/blueimp-file-upload/js/vendor/jquery.ui.widget',
    iframetransport:pathname+'vendor/blueimp-file-upload/js/jquery.iframe-transport',
    fileupload:pathname+'vendor/blueimp-file-upload/js/jquery.fileupload',
    chosen:pathname+'vendor/chosen/chosen.jquery.min',
    tagsinput: pathname+'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
    backgrid: pathname+'vendor/backgrid/lib/backgrid.min',
    "backbone.paginator": pathname+'vendor/backbone.paginator/lib/backbone.paginator.min',
    backgrid_paginator: pathname+'vendor/backgrid-paginator/backgrid-paginator',
    google: 'https://apis.google.com/js/client.js?onload=define',
    moment: pathname+'vendor/moment/min/moment.min',
    hacktool: pathname+'js/Hacktool'
  },
  
  urlArgs: "bust=" +  (new Date()).getTime()
});


var Hacktool;

require(
  ['backbone', 'hacktool', 'bootstrap'],
  function(Backbone, hacktool, Bootstrap)
  {
    $(document).ready(function()
    {     

      Hacktool = hacktool;
      Hacktool.init();
    });
  }
);
