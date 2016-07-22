var token;
var  hacktoolRepos = [];

function request(config) {
  if(!config.headers) config.headers = {}
  if(!config.headers.Authorization && token) config.headers.Authorization = "token " + token;

  return $.ajax(config);
}

function filterRepos(repos) {

  for(repo in repos) {

    //change it to hacktool
    if (repos[repo].name.substring(0, 8) == "backbone") {
      hacktoolRepos.push(repos[repo]);
    }
  }

  return hacktoolRepos;
}

var hacktoolSdk = {

  user: null,

  setToken: function(t){
    token = t;
  },

  // Raw JSON fetcher for the file
  readJSON: function(content, success, error) {
    $.getJSON(content, null, success);
  },

  Organizations:  {
    Teams: {
      list: function (argument) {
        // body...
      }
    },
    Repositories: {
      list: function (organization, success, error) {
        request({
            url: 'https://api.github.com/orgs/'+organization+'/repos?type=public',
            method: 'GET'
        }).done(function(data) {
          success(filterRepos(data))
        }).error(error);
      }
    },
    list: function (callback) {
      request({
          url: 'https://api.github.com/user/orgs',
          method: 'GET'
      }).done(function(data) {
        callback(null, data)
      }).error(callback);
    },
    repo: function (organization) {
      alert(organization);
    }
  },

  Users: {
    me: function (success, error) {
      request({
          url: 'https://api.github.com/user',
          method: 'GET'
      }).done(function(data) {
        console.log(data)
        hacktoolSdk.user = data;
        success(data)
      }).error(error);
    }
  },

  Components: {

    // Global GET function for every json file in the repo
    get: function (component, success, error) {
      request({
          url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/components/'+component+'.json',
          method: 'GET'
      }).done(function(data) {
        hacktoolSdk.readJSON(data.download_url, success)
      }).error(error);
    }
  },

  Articles: {

    getMetadata: function(success, error) {
      request({
          url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/metadata.json',
          method: 'GET'
      }).done(function(data) {
        hacktoolSdk.readJSON(data.download_url, success)
      }).error(error);
    },

    list: function(success, error) {
      hacktoolSdk.Articles.getMetadata(success, error);
    },

    add: function(HTML, success, error) {

      // Get the metadata first so we know on what ID we should add the new article
      hacktoolSdk.Articles.getMetadata(function(data){

        var lastId = data.articles.length? data.articles[data.articles.length-1].id: 0;
        var article = hacktoolSdk.Articles.prepareArticle(HTML, lastId);

        request({
            url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/k7y_'+Date.now()+'.json',
            method: 'PUT',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                message: "asdasd",
                content: HTML
            })
        }).done(function(data) {
          //console.log(data);
          hacktoolSdk.readJSON(data.download_url, success)
        }).error(error);
      });
    },

    prepareArticle: function(HTML, lastId) {

      introLength = 200;

      return {
        id: lastId +1,
        content: HTML
      }
    }
  }

}
