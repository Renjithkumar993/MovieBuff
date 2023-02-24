const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';
const IMBDKey = '60284bb58aafe269068499987d0a2596';

// fetch(`https://api.watchmode.com/v1/sources/?apiKey=${WMKey}`)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
// })


let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${IMBDKey}&language=en-US`

// fetch(`https://api.themoviedb.org/3/movie/222?api_key=${IMBDKey}`)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//   console.log(data);
// })



var posterImage = " ";

fetch(nowPlayingUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    
    
    
    for (i = 0; i < data.results.length; i++) {
        var posterImage = data.results[i].poster_path;
        var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;
      
        var column = $("<div>").addClass("column is-one-quarter");
        var card = $("<div>").addClass("card");
      
        var cardImage = $("<div>").addClass("card-image");
        var figure = $("<figure>").addClass("image is-3by5 poster");
        var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");
      
        figure.append(img);
        cardImage.append(figure);
        card.append(cardImage);
        column.append(card);
      
        $(".slides .columns").append(column);
      }
      
    });


