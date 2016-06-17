# Backbone Authorization with Mustache

Managing Roles (Authorization) and content visualization with Backbone and Mustache

## Features
- Visualization of specific elements in Mustache templates according to available
Roles;
- Global access to the Roles through Javacript variables;
- Request the Roles from an external API;

## Requirements
- [backbonejs](http://backbonejs.org/)
- [mustache.js](https://github.com/janl/mustache.js/)

## Instalation
- **Script Tag:** `<script type="text/javascript" src="http://cdn.rawgit.com/Cloudoki/backbone-auth/master/index.js"></script>`
- **Bower:** `bower install git://github.com/Cloudoki/backbone-auth.git`
- **npm:** `npm install github:Cloudoki/backbone-auth`

## Usage

#### Initialize the plugin:
```javascript
  // Define your Roles in an array or json format
  var roles = ['title:view'];             // Roles array
  // var roles = {"title:view": true}     // Roles json

  var auth = new Auth();                  // Initialize the authorizations plugin
  auth.set(roles);                        // Apply the Roles
```

#### Run through Mustache:
After initializing the plugin, the Roles will be automatically hooked up on Mustache:
```javascript
  var template = "{{#_auth_.title:view}} {{title}} {{/_auth_.title:view}} \
                  {{^_auth_.title:view}} Not authorized to see title {{/_auth_.title:view}}";

  this.$el.html(Mustache.render( template, {title: 'Hello World!'}));     // Render
```

#### Access Roles on Javascript:
You can also access the Roles through Javascript variables:
```javascript
  console.log(auth.get('title:view'));    // true
  console.log(auth.get('name:update'));   // undefined
```

### Fetch authorizations from resource API

```javascript
// You will need to extend the Auth Backbone Model
// to provide the authorizations resource url
var xAuth = Auth.extend({
  url: function(){
    return '/authorizations'
  }
});

var auth = new xAuth();
auth.fetch({
  success: function(){
    console.log('authorizations loaded');
  },
});
```

### Check the examples

You will need a static server

`npm install -g http-server`

Serve the entire project directory

`http-server ./`

Open your browser at `http://127.0.0.1:8080/examples/`
