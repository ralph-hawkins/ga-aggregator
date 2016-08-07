var app = {};

app.getReddit = function(done){
  var content;
  $.ajax({
    url: 'https://www.reddit.com/top.json',
    dataType: 'json',
    crossDomain: true,
    success: function(response){
      var articles = response.data.children;

      articles.forEach(function(article){
        $('#foo').prepend(article.data.thumbnail + 'content');
      });

      // console.log(response.data.children[0].data.thumbnail);
      // content = response.data.children[0].data.thumbnail;
      // $('#foo').prepend(content + ' from reddit');
    }
  });
};

app.init = function(){
  app.getReddit();
};

$(document).ready( app.init );