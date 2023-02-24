function watchMode() { 

//Watchmode API key
const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

var submitMovieTitle = document.getElementById("name");
// Initializing search parameters
var movieTitle = submitMovieTitle.value;


// Search for the movie using the Watchmode API's search functionality
fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(movieTitle)}`)
  .then(function(response) {
    return response.json()
  })
  .then(function (data) {
    // Extract the Watchmode ID for the first search result
    watchmodeId = data.title_results[0].id;
    // Retrieve the streaming information for the movie using the Watchmode ID
    return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`);
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
    // Extract the streaming services from the streaming information
        console.log(data);
    });
}