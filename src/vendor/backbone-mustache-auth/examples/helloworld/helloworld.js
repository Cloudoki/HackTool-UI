/* global Backbone, Mustache, Auth */
(function (Backbone, Mustache, Auth) {
  'use strict';
  var authorizations = ['title'];
  var auth = new Auth();
  var GreetingView = Backbone.View.extend({
    el: document.getElementById('title'),
    render: function () {
      this.$el.html(Mustache.render('{{#_auth_.title}}{{title}}{{/_auth_.title}}' +
        '{{^_auth_.title}}Not authorized to see title{{/_auth_.title}}', {
          title: 'Hello World!'
        })
      );

      return this;
    }
  });

  auth.set(authorizations);

  var view = new GreetingView();

  view.render();
  // revoke permissions after one second
  setTimeout(function() {
    console.log('!!');
    auth.set([]);
    view.render();
  }, 2000)
})(Backbone, Mustache, Auth);
