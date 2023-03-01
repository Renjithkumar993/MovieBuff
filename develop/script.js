const searchHistorySpace = document.getElementById('searchHistoryWrapper');
var searchInput = document.getElementById('searchField');

let searchCounter = localStorage.getItem("searchCounter") || 1; // get current value of searchCounter from local storage, or initialize to 1 if not set
let searchHistory =[];

document.querySelector('#searchForm').addEventListener('submit', function(e){
  e.preventDefault();
  console.log(searchInput.value.trim());
  let searchQuery = searchInput.value.trim();
  searchCounter++; // increment counter variable for next search
  searchHistory.push(searchQuery);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  createHistoryButtons(searchQuery);
});


// Off Canvas for search history buttons.
const searchHistoryEl = document.getElementById('historyBtn');
searchHistoryEl.addEventListener("click", openNav);

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}


// Loading Search History Buttons on page load //
window.addEventListener('DOMContentLoaded', searchHistoryOnLoad);

function searchHistoryOnLoad(){
console.log('at least this is working');
  const searchHistorySpace = document.getElementById('searchHistoryWrapper'); // replace with ID of search history display element
  searchHistorySpace.innerHTML=''; // use innerHTML instead of textContent to clear previous contents
  const localStorageData = JSON.parse(localStorage.getItem('searchHistory')) || []; // use empty array as default value if search history not found in local storage

  localStorageData.forEach(searchTerm => {
    const button = document.createElement('button'); // create button element
    button.classList.add('history-button'); // add class to button for styling
    button.textContent = searchTerm;
    button.addEventListener('click', () => {
      TMDb_(searchTerm)
        .then((movies) => {
          // creating the wrapper for the movies
          const wrapper = document.getElementById('movieCardWrapper');
          // initializing movie card element as a empty string
          var movieElmt = '';
          console.log(movies);
          // looping through the movie results
          for (let i = 0; i < movies.length; i++) {
            movieElmt += movieCard(movies[i]);
          }
          // setting the content inside the wrapper to display all the movies from the array with the templated string
          wrapper.innerHTML = movieElmt;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    searchHistorySpace.appendChild(button);
  })
};

 // Creating Search History Buttons //
function createHistoryButtons(){
  const searchHistorySpace = document.getElementById('searchHistoryWrapper'); // replace with ID of search history display element
  searchHistorySpace.innerHTML=''; // use innerHTML instead of textContent to clear previous contents
  const localStorageData = JSON.parse(localStorage.getItem('searchHistory')) || []; // use empty array as default value if search history not found in local storage

  localStorageData.forEach(searchTerm => {
    const button = document.createElement('button'); // create button element
    button.classList.add('history-button'); // add class to button for styling
    button.textContent = searchTerm;
    button.addEventListener('click', () => {
      TMDb_(searchTerm)
        .then((movies) => {
          // creating the wrapper for the movies
          const wrapper = document.getElementById('movieCardWrapper');
          // initializing movie card element as a empty string
          var movieElmt = '';
          console.log(movies);
          // looping through the movie results
          for (let i = 0; i < movies.length; i++) {
            movieElmt += movieCard(movies[i]);
          }
          // setting the content inside the wrapper to display all the movies from the array with the templated string
          wrapper.innerHTML = movieElmt;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    searchHistorySpace.appendChild(button);
  })
};

      //performSearch(searchTerm); // replace with function that performs a search using the clicked search term
        // function that fetches the TMDb API when search history buttons are clicked
          async function TMDb_(searchTerm) {
            //TMDb api Key
            const TMDb_KEY = '60284bb58aafe269068499987d0a2596';
            //API url call
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDb_KEY}&query=${searchTerm}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error(error);
            }
          }

          $('#searchForm').on('submit', function(e) {
            e.preventDefault();
            var searchQueryInput = e.currentTarget[0].value;
            TMDb_(searchQueryInput)
            .then((movies) => {
                // creating the wrapper for the movies
                const wrapper = document.getElementById('movieCardWrapper');
                // initializing movie card element as a empty string
                var movieElmt = '';
                console.log(movies);
                // looping through the movie results
                for (let i = 0; i < movies.length; i++) {
                  movieElmt += movieCard(movies[i]);
                }
                // setting the content inside the wrapper to display all the movies from the array with the templated string
                wrapper.innerHTML = movieElmt;
            })
            .catch((error) => {
                console.error(error);
            });
          });

          function movieCard(movie) {
            // variables for the poster pather, movie titles, movie release dates, and overview of the movies
            var posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
            var movieTitle = movie.title;
            var movieReleaseDate = movie.release_date;
            var overview = movie.overview;
            
            // templated string to display all the movies from the array
            return /*html*/`<div class="column is-one-quarter">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${posterPath}" alt="Movie poster">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${movieTitle}</p>
                    <p class="subtitle is-6">${movieReleaseDate}</p>
                  </div>
                </div>
                <div class="content">
                  ${overview}
                </div>
              </div>
            </div>
          </div>`;
        }

//Clearing Search History
//const searchHistorySpace = document.getElementById('searchHistoryWrapper');
const clearHistoryEl = document.getElementById('clearHistoryBtn');
clearHistoryEl.addEventListener('click', clearSearchHistory);
function clearSearchHistory(){
  localStorage.clear();
  searchHistory=[];
  searchHistorySpace.textContent='';
}

//Toggle Modal Tabs
const modalInfoTabLink = document.querySelector('.modalInfoTabLink');
const modalStreamingTabLink = document.querySelector('.modalStreamingTabLink');

// Add event listeners to the tab links
modalInfoTabLink.addEventListener('click', () => {
  console.log('Movie Info');
  // Toggle the is-active class on the tab links
  modalInfoTabLink.parentElement.classList.add('is-active');
  modalStreamingTabLink.parentElement.classList.remove('is-active');
});

modalStreamingTabLink.addEventListener('click', () => {
  console.log('Streaming Services');
  // Toggle the is-active class on the tab links
  modalStreamingTabLink.parentElement.classList.add('is-active');
  modalInfoTabLink.parentElement.classList.remove('is-active');
});

// Toggle Modal Content
function showTabContent(tabID){
  var tabContents = document.querySelectorAll('.modal-card-body > div');
 // Hide all the modal content divs except the one containing the tabs
 tabContents.forEach(function(tabContent, index) {
  if (index !== 0) {
    tabContent.style.display = 'none';
  }
});
   // Show the selected tab content div
   var selectedTabContent = document.getElementById(tabID);
   selectedTabContent.style.display = 'block';
 }
