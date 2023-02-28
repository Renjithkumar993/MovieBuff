
// Section for selecting HTML elements from the DOM and assigning them to JavaScript variables.
//const movieInputEl = document.getElementById("movieName");
//const submitButtonEl = document.getElementById("searchBtn")

// Function that fetches the Watchmode API data
//function watchMode() { 

//Watchmode API key
//const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

// Search for the movie using the Watchmode API's search functionality
//fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(searchQuery)}`)
  //.then(function(response) {
    //return response.json()
  //})
  //.then(function (data) {
    // Extract the Watchmode ID for the first search result
    //watchmodeId = data.title_results[0].id;
    //runtimeEl = data.title_results[0].runtime_minutes;
    //genreEl = data.title_results[0].genre_name;
    //userRatingEl = data.title_results[0].user_rating;
    //criticScoreEl = data.title_results[0].critic_score;
    //usRatingEl = data.title_results[0].us_rating;
    //posterEl = data.title_results[0].poster;
    //similarTitlesEl = data.title_results[0].similar_titles;
    //trailerEl = data.title_results[0].trailer
    // Retrieve the streaming information for the movie using the Watchmode ID
    //return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`)
  //.then(function(response) {
    //return response.json()
  //})
  //.then(function(data) {
    // Extract the streaming services from the streaming information
    //console.log(data);
    
    //}
    
    
  //});

// Taking in form input.
//var searchInput = document.getElementById('searchField');

//let searchCounter = localStorage.getItem("searchCounter") || 1; // get current value of searchCounter from local storage, or initialize to 1 if not set

//document.querySelector('#searchForm').addEventListener('submit', function(e){
  //e.preventDefault();
  //console.log(searchInput.value.trim());
  //let searchQuery = searchInput.value.trim();
  //let key = "movieSearch" + searchCounter; // use the counter variable to create a unique key
  //localStorage.setItem(key, searchQuery); // save search query to local storage with the unique key
  //searchCounter++; // increment counter variable for next search
  //localStorage.setItem("searchCounter", searchCounter); // update the value of searchCounter in local storage
//});












/*
const submitButtonEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchField");

let searchCounter = 1; // initialize counter variable to 1

submitButtonEl.addEventListener("click", function() {
  const searchQuery = searchInputEl.value.trim();
  const key = "movieSearch" + searchCounter; // use the counter variable to create a unique key
  localStorage.setItem(key, searchQuery); // save search query to local storage with the unique key
  searchCounter++; // increment counter variable for next search
});
*/



/*
// Get the search form and input elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchField');

// Listen for the form submission event
searchForm.addEventListener('submit', function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the search input value
  const searchValue = searchInput.value.trim();

  // Save the search value to local storage
  localStorage.setItem('Movie Title', searchValue);
});
*/