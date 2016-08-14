var pathname = window.location.pathname;
var require = {

	baseUrl : pathname+'js',

	paths: {
    jquery: pathname+'vendor/jquery/dist/jquery.min',
    backbone: pathname+'vendor/backbone/backbone-min',
    requirejs: pathname+'vendor/requirejs/require',
    underscore: pathname+'vendor/underscore/underscore-min',
    backgrid: pathname+'vendor/backgrid/lib/backgrid',
    mustache: pathname+'vendor/mustache.js/mustache',
    bootstrap: pathname+'vendor/bootstrap/dist/js/bootstrap.min',
    backbone_auth: pathname+'vendor/backbone-auth/index',
    backbone_i18n: pathname+'vendor/backbone-i18n/index',
    backbone_notes: pathname+'vendor/backbone-notes/index',
    backbone_notifications: pathname+'vendor/backbone-notifications/index',
    chosen: pathname+'vendor/chosen/chosen.jquery.min',
    jqueryUI: pathname+'vendor/jquery-ui/jquery-ui.min',
    moment: pathname+'vendor/moment/min/moment.min',
    typeahead: pathname+'vendor/typeahead.js/dist/typeahead.jquery.min',
    bloodhound: pathname+'vendor/typeahead.js/dist/bloodhound.min',
    tagsinput: pathname+'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
    backbone_tags: pathname+'vendor/backbone-tags/index',
    fullCalendar: pathname+'vendor/fullcalendar/dist/fullcalendar.min'
	},

  shim: {
    backgrid: {
        deps: ['jquery', 'backbone', 'underscore'],
        exports: 'Backgrid'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'bootstrap'
    },
      
     fullCalendar: {
        deps: ['jquery', 'moment'],
        exports: 'fullCalendar'
    },
      
    chosen: {
      deps: ['jquery'],
      exports: 'jQuery.fn.chosen'
    },
      
    typeahead: {
        deps: ['jquery'],
        init: function($) {
            return require.s.contexts._.registry['typeahead.js'].factory($);
        }
    },
    bloodhound: {
        deps: ['jquery'],
        exports: 'Bloodhound'
    },
    backbone_tags: {
        deps: ['bloodhound', 'tagsinput'],
        exports: 'backbone_tags'
    },
    tagsinput: {
        deps: ['jquery', 'bootstrap', 'typeahead'],
        exports: 'jQuery.fn.tagsinput'
    }
  },

	urlArgs: "bust=" +  (new Date()).getTime()
};
