var app = {};

// app.todayDate = function(){
//   var d = new Date();

//   var month = d.getMonth()+1;
//   var day = d.getDate();

//   var output = d.getFullYear()-8 + '-' +
//     ((''+day).length<2 ? '0' : '') + day +
//     ((''+month).length<2 ? '0' : '') + month + '-';
//   console.log(output);
//   return output;
// };

// app.oneYearPreviousDate = function(){
//   var d = new Date();

//   var month = d.getMonth()+1;
//   var day = d.getDate();

//   var output = d.getFullYear()-10 + '-' +
//     ((''+day).length<2 ? '0' : '') + day +
//     ((''+month).length<2 ? '0' : '') + month + '-';
//   console.log(output);
//   return output;
// };

// app.getGiphyGif = function(done, image){
//   var url = "http://api.giphy.com/v1/gifs/search?" + 'q=' + image + '&api_key=' + "dc6zaTOxFJmzC";
//   console.log(url);
//   $.ajax({
//     url: url,
//     method: 'GET',
//   }).done(function(response) {
    
//       var image = response.data[1].images.fixed_height.url;
//       console.log(response);
    
//   }).fail(function(err) {
//     throw err;
//   });
// };

// app.getReddit = function(done){
//   var content;
//   $.ajax({
//     url: 'https://www.reddit.com/top.json',
//     dataType: 'json',
//     crossDomain: true,
//     success: function(response){
//       var articles = response.data.children;

//       articles.forEach(function(article){

//         imageFromArtical = article.data.thumbnail;
//       });

//       // console.log(response.data.children[0].data.thumbnail);
//       // content = response.data.children[0].data.thumbnail;
//       // $('#foo').prepend(content + ' from reddit');
//     }
//   });
// };


app.getNYTReview = function(done){
  var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
  url += '?' + $.param({
    'api-key': "1aef32b925dc44afaa8da71f69312d03",
    //'publication-date': '"' + app.todayDate() + '";' + app.oneYearPreviousDate() + ';"',
    'critics-pick': "Y"
  });
  console.log(url);
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(response) {
    for (i = 0; i < 20; i++) { 
      var filmTitle = response.results[i].display_title;
      var image = response.results[i].multimedia.src;
      var link = response.results[i].link.url;
      $('#filmList').append(
        '<a href="' + link + '"><li id="filmPosition' + i + '"><h2> ' + filmTitle + '</h2></li></a>');
      app.getGiphyGif(filmTitle, i );
    }
  }).fail(function(err) {
    throw err;
  });
};

app.getGiphyGif = function(imageSearch, index){
  var concatSearch = imageSearch.replace(/\s+/g, '+');
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + concatSearch + '&api_key=dc6zaTOxFJmzC';
  var giphyGif;
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(response){
      var number = 1 + Math.floor(Math.random() * 6);
      var giphyGif = response.data[number].images.downsized_large.url;
      var backgroundGiphy = document.getElementById( 'filmPosition' + index );
      backgroundGiphy.style.backgroundImage = "url(" + giphyGif + ")";
    }
  });
};


app.init = function(){
  app.getNYTReview();
};

$(document).ready( app.init );