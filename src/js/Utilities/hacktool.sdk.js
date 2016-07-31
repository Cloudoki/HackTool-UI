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
      list: function (team, success, error) {
        request({
          url: 'https://api.github.com/teams/'+team+'/members',
          method: 'GET'
        }).done(function(data) {
            console.log(data)
            success(data)
        }).error(error);
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
        hacktoolSdk.readJSON(data.download_url, function(result){
          success(result, data.sha)
        })
      }).error(error);
    },

    update: function(component, content, success, error) {
      request({
        url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/components/'+component+'.json',
        method: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          message: "updating toolbelt repos",
          content: btoa(JSON.stringify(content.content)),
          sha: content.sha
        })
      }).done(success).error(error);
    }
  },

  Articles: {

    getMetadata: function(success, error) {
      request({
          url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/metadata.json',
          method: 'GET'
      }).done(function(data) {
        hacktoolSdk.readJSON(data.download_url, function(metadata){
          success(metadata, data.sha)
        })
      }).error(error);
    },

    updateMetadata: function(metadata, sha, success, error) {
      request({
        url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/metadata.json',
        method: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          message: "publishing new article",
          content: btoa(JSON.stringify(metadata)),
          sha: sha
        })
      }).done(function(data) {
        hacktoolSdk.readJSON(data.download_url, success)
      }).error(error);
    },

    list: function(success, error) {
      hacktoolSdk.Articles.getMetadata(success, error);
    },

    add: function(article, success, error) {
      // Get the metadata first so we know on what ID we should add the new article
      hacktoolSdk.Articles.getMetadata(function(data, sha){
        // Reads metadata json info
        var metadata = data;
        var lastId = metadata.articles.length? metadata.articles[metadata.articles.length-1].id: 0;

        // Write article in git (new file)
        request({
            url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/k7y_'+Date.now()+'.json', //change hardcoded user to logged user
            method: 'PUT',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                message: "publishing new article",
                content: btoa(JSON.stringify(article))
            })
        }).done(function(data) {
          metadata.articles.push({
            id: lastId+1,
            title: article.title,
            intro: article.content.substring(0,100),
            created_by: data.content.name.substring(0, data.content.name.lastIndexOf('_')),
            created_at: data.commit.author.date,
            filename: data.content.name
          });
          metadata.total = metadata.articles.length;
          hacktoolSdk.Articles.updateMetadata(metadata, sha);
        }).error(error);
      });
    },

    read: function(name, success, error) {
      request({
          url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/articles/'+name,
          method: 'GET'
      }).done(function(data) {
        hacktoolSdk.readJSON(data.download_url, success)
        //we need to extract the content of the data and then decode it
      }).error(error);
    },

    get: function(id, success, error) {

      hacktoolSdk.Articles.getMetadata(function(data){

        var filename = null;

        for (var n in data.articles) {
          if (data.articles[n].id == id) {
            filename = data.articles[n].filename
            break;
          }
        }
        console.log("File: ", filename);
        hacktoolSdk.Articles.read(filename, success, error);
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
