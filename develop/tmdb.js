// function that fetches the TMDb API
async function TMDb_(searchQuery) {
  //TMDb api Key
  const TMDb_KEY = "60284bb58aafe269068499987d0a2596";
  //API url call
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDb_KEY}&query=${searchQuery}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  var searchQueryInput = e.currentTarget[0].value;
  TMDb_(searchQueryInput)
    .then((movies) => {
      // creating the wrapper for the movies
      const wrapper = document.getElementById("movieCardWrapper");
      // initializing movie card element as a empty string
      var movieElmt = "";
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

  // templated string to display all the movies from the array
  return /*html*/ `<div class=" column is-6-mobile is-one-quarter">
   <div class="card">
     <div class="card-image">
       <figure class="image is-4by3">
         <img src="${posterPath}" alt="Movie poster">
       </figure>
     </div>
     <div class="card-content p-1 mt-2">
       <div class="media">
         <div class="media-content p-2">
           <p class="title is-4 is-size-6-mobile">${movieTitle}</p>
           <p class="subtitle is-6 ">${movieReleaseDate}</p>
         </div>
       </div>
     </div>
   </div>
 </div>`;
}


function setModalTitle(cardMovieTitle) {
  modalTitleEl.textContent = cardMovieTitle;
}

// Add an event listener to the movie card wrapper
document
  .getElementById("movieCardWrapper")
  .addEventListener("click", function (event) {
    // Check if the clicked element is a movie card
    if (event.target.closest(".card")) {
      // Get the movie title from the clicked card
      const card = event.target.closest(".card");
      const title = card.querySelector(".title");

      let cardMovieTitle = title.textContent;
      runFetch(cardMovieTitle);
      runFetch2(cardMovieTitle);
      modalToggle()
        //setModalTitle(cardMovieTitle)
        .then(function () {
          //modalToggle();
          setModalTitle(cardMovieTitle);
        })
        .catch(function (error) {
          // Handle the error
          console.error(error);
        });
    }
  });

var modalTitleEl = document.getElementById("modalTitle");

// API Calls to get more information //

// 1. Function that fetches the Watchmode API data for streaming services //
function runFetch2(cardMovieTitle) {
  // Return a promise
  return new Promise(function (resolve, reject) { // Test to see if this is necessary anymore //
    //Watchmode API key
    const WMKey = "FsLuIFnSyCV78DmZaaBgNkK3QZn1cprUHovPTxcW";

    // Search for the movie using the Watchmode API's search functionality
    fetch(
      `https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(
        cardMovieTitle
      )}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check if any search results were returned
        if (data.title_results && data.title_results[0]) {
          // Extract the Watchmode ID for the first search result
          watchmodeId = data.title_results[0].id;
          console.log(watchmodeId);
          // Retrieve the streaming information for the movie using the Watchmode ID
          return fetch(
            `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${WMKey}`
          );
        } else {
          // Handle the case where there are no search results
          throw new Error("No search results found");
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Extract the movie information
        //setModalTitle(cardMovieTitle); // This pops in a little slow... I wonder if there is another way to make it work better?
        const movieInfoWrapperEl = document.getElementById("movieInfoWrapper");
        var infoElmt = "";

        //Initializing Elements
        var runtimeEl = data.runtime_minutes;
        var filmTitleEl = data.title;
        var userRatingEl = data.user_rating;
        var criticScoreEl = data.critic_score;
        var usRatingEl = data.us_rating;
        var backdropEl = data.backdrop;
        var trailerEl = data.trailer;
        var plotOverviewEl = data.plot_overview;

        infoElmt += /*html*/ `<div>
              <div class = "modalInfoBodyContent">
                <div class = "media-content">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src="${backdropEl}" alt="Movie backdrop">
                    </figure>
                  </div>
                  <div class = "content">
                    <h2 class="has-text-weight-bold" id="modalTitleItem"><strong id = "filmTitonModal">${filmTitleEl}</strong></h2>
                      <ul id="noBullets" class="has-text-weight-semibold">
                      <li> Runtime: ${runtimeEl} minutes</li>
                      <li> Age Rating: ${usRatingEl}</li>
                      </ul>
                  </div>

                  <div class="content has-text-weight-semibold">
                    ${plotOverviewEl}
                  </div>

                  <div class="media-content">
                    <p id="titleColour" class="title is-4">Revew Scores:</p>
                    <ul id="noBullets" class="subtitle is-6 has-text-weight-semibold">
                      <li>Viewer rating: <strong id="vwrRtng">${userRatingEl}</strong></li>
                      <li>Critic Rating: <strong id="critRtng">${criticScoreEl}</strong></li>
                      </ul>
                  </div>

                  <div>
                  <br>
                  <a href ="${trailerEl}" class="button is-primary">View the Trailer</a>
                  </div>
                  <br>
                </div>
              </div>
            </div>`;
        //$('movieInfoWrapper').html(infoElmt);
        movieInfoWrapperEl.innerHTML = infoElmt;
      });
  });
}

// 2. Function that fetches the Watchmode API data for streaming services //
function runFetch(cardMovieTitle) {
  // Return a promise
  return new Promise(function (resolve, reject) {
    //Watchmode API key
    const WMKey = "FsLuIFnSyCV78DmZaaBgNkK3QZn1cprUHovPTxcW";

    // Search for the movie using the Watchmode API's search functionality
    fetch(
      `https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(
        cardMovieTitle
      )}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check if any search results were returned
        if (data.title_results && data.title_results[0]) {
          // Extract the Watchmode ID for the first search result
          watchmodeId = data.title_results[0].id;
          // Retrieve the streaming information for the movie using the Watchmode ID
          return fetch(
            `https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`
          );
        } else {
          // Handle the case where there are no search results
          throw new Error("No search results found");
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Extract the streaming services from the streaming information
        const newArray = data.reduce((accumulator, current) => {
          if (
            !accumulator.some(
              (obj) =>
                obj.source_id === current.source_id && obj.name === current.name
            )
          ) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        // Remove duplicate results.
        // Resolve the promise with the data
        resolve(newArray);
        //Initialize wrapper as an empty string
        const modalStreamingWrapper = document.getElementById(
          "streamingServicesWrapper"
        );
        modalStreamingWrapper.innerHTML = "";
        //Initialize streaming element as an empty string
        var streamingElmt = "";
        // Initializing other Elements
        modalTitleEl.innerHTML = "";

        // Loop through streaming services
        for (let i = 0; i < newArray.length; i++) {
          var streamingServiceName = newArray[i].name;
          var accessType = newArray[i].type;
          var regionalAvailability = newArray[i].region;
          var webURL = newArray[i].web_url;
          var price = newArray[i].price;

          streamingElmt += `<div>
              <button class = "accordion">${streamingServiceName}</button>
              <div class = "panel">
                <div>
                  <ul>
                    <li>Accesible by ${accessType}</li>
                    <li>Available in ${regionalAvailability}</li>
                    <li><a href = "${webURL}" target="_blank">Watch Here!</a></li>
                    <li>Service cost ${price}</li>
                  </ul>
                </div>
              </div>
            </div>`;
          //printToModal(newArray[i]);
          //modalStreamingWrapper.appendChild(streamingElmt);
        }
        // setting the content inside the wrapper to display all the streaming services from the array with the templated string
        $("#streamingServicesWrapper").html(streamingElmt);

        modalStreamingWrapper.innerHTML = streamingElmt;

        // Applies the logic to the accordion elements //
        setAccordionLogic();
      })
      .catch(function (error) {
        // Handle any errors that occur in the fetch or processing of data
        console.error(error);
        // Reject the promise with the error
        reject(error);
      });
  });
}

//Modal Section
// Function to open and close modal.
function modalToggle() {
  $(document).ready(function () {
    $("#myModal").toggle();
  });
}

// Get the "Cancel" button element
const closeModalBtn = document.getElementById("closeModalBtn");
// Add an event listener to the "Cancel" button
closeModalBtn.addEventListener("click", function () {
  // Call the modalToggle function to close the modal
  modalToggle();
});

// Locic for accordion animation //
function setAccordionLogic() {
  var accordion = document.getElementsByClassName("accordion");
  var j;

  for (j = 0; j < accordion.length; j++) {
    accordion[j].addEventListener("click", function () {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}


// Moved from wm.js //

const openWatchLaterButtonEl = document.getElementById('openWatchLaterBtn');
openWatchLaterButtonEl.addEventListener('click', watchLaterModalToggle);
const closeWatchLaterEl = document.getElementById('closeWatchLater');
closeWatchLaterEl.addEventListener('click', watchLaterModalToggle);

// Watch Later Modal Section 
// Function to open and close modal
function watchLaterModalToggle(){
  $(document).ready(function() {
    $('#watchLaterWrapper').toggle();
  });
}

var watchLater = JSON.parse(localStorage.getItem('MyWatchLaterList'));

if(!watchLater) {
  watchLater = [];
}

//Add to Watch Later Functionality
  const watchLaterButtonEl = document.getElementById('watchLaterBtn');
  watchLaterButtonEl.addEventListener('click', saveWatchLater);
  const modalMovieTitleEl = document.getElementById("modalTitle");

  // Adds new entry to local storage when the watch later button is clicked
  function saveWatchLater() {
    //save to watch later after page load
      if(!watchLater.includes(modalMovieTitleEl.textContent)) {
        $(document).ready(function() {
          watchLater.push(modalMovieTitleEl.textContent); // Fixed so that it now saves to local storage in an array!
          localStorage.setItem('MyWatchLaterList', JSON.stringify(watchLater));
        });
      }
  }

// Remove from Watch Later Functionality
  function removeWatchLaterEntry(){
  
  }

  const WatchLaterListEl = document.getElementById("watchLaterListWrapper");
//Set Watch Later to be generated upon page loading //
window.onload = function(){
  WatchLaterListEl.innerHTML='';
  var watchLaterData = JSON.parse(localStorage.getItem('MyWatchLaterList')) || []; // use empty array as default value if search history not found in local storage
// Loop through the array
console.log("is this working?????")
console.log(watchLaterData.length);
for (var i = 0; i < watchLaterData.length; i++) {
    // Get the name of the current item
    console.log("i");
    var itemName = watchLaterData[i]
    console.log(itemName);

    // Create a new div element
    var div = $('<div></div>').addClass('button is-normal is-responsive is-outlined is-dark has-text-primary mr-2').attr('role','button');

    div.on('click', function(){
      // functions to allow searches
      runFetch(itemName);
      runFetch2(itemName);
      modalToggle();
      watchLaterModalToggle();
    });
  
    // Set the content of the div to the item name
    div.text(itemName);
  
    // Append the div to the document body or another parent element
    $('#watchLaterListWrapper').append(div);
  }
}

// Set watch later to be updated every time a new entry is added //
function generateNewWatchLaterContent(){
  WatchLaterListEl.innerHTML='';
  var watchLaterData = JSON.parse(localStorage.getItem('MyWatchLaterList')) || []; // use empty array as default value if search history not found in local storage
// Loop through the array
for (var i = 0; i < watchLaterData.length; i++) {
    // Get the name of the current item
    var itemName = watchLaterData[i];

    // Create a new div element
    var div = $('<div></div>').addClass('button').addClass('is-warning').attr('role','button');

    div.on('click', function(){
      // functions to allow searches
      runFetch(itemName);
      runFetch2(itemName);
      modalToggle();
      watchLaterModalToggle();
    });

    // Set the content of the div to the item name
    div.text(itemName);
  
    // Append the div to the document body or another parent element
    $('#watchLaterListWrapper').append(div);
  }
}

//Modal Section 
    // Function to open and close modal.
    function modalToggle(){
      $(document).ready(function() {
        $('#myModal').toggle();
      });
    }

    const searchHistorySpace = document.getElementById('searchHistoryWrapper');
    var searchInput = document.getElementById('searchField');
    
    let searchCounter = localStorage.getItem("searchCounter") || 1; // get current value of searchCounter from local storage, or initialize to 1 if not set
    
    // Initializing local storage on page load //
    let currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    
    if (!currentSearchHistory) {
      currentSearchHistory = [];
      localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
     } else {
      createHistoryButtons();
    }
    
    document.querySelector('#searchForm').addEventListener('submit', function(e){
      e.preventDefault();
      let searchQuery = searchInput.value.trim();
      if (searchQuery == "") {
        return;
      }
      let storedSearchHistory = localStorage.getItem('searchHistory');
      let storedSearchHistoryArray = JSON.parse(storedSearchHistory);
      if (storedSearchHistory.includes(searchQuery)){
        return;
      }
      storedSearchHistoryArray.push(searchQuery);
      let updatedStoredSearchJSON = JSON.stringify(storedSearchHistoryArray);
      localStorage.setItem('searchHistory', updatedStoredSearchJSON);
      createHistoryButtons();

    });
    
    // Off Canvas for search history buttons.
    const searchHistoryEl = document.getElementById('historyBtn');
    searchHistoryEl.addEventListener("click", openNav);
    
    function openNav() {
      var sideNavEl = document.getElementById("mySidenav");
      sideNavEl.style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.body.style.backgroundColor = "white";
    }

    // Hide trending and currently on air //
    $(".history-button").on("click", function(){
         
      $(".hidewhensearch").hide();

      $(".searchresultheading").show();
     
    })
    
    // Creating Search History Buttons //
function createHistoryButtons(){
  const searchHistorySpace = document.getElementById('searchHistoryWrapper'); // replace with ID of search history display element
  searchHistorySpace.innerHTML=''; // use innerHTML instead of textContent to clear previous contents
  const localStorageData = JSON.parse(localStorage.getItem('searchHistory')) || []; // use empty array as default value if search history not found in local storage

  localStorageData.forEach(searchTerm => {
    const button = document.createElement('button'); // create button element
    button.classList.add('history-button'); // add class to button for styling
    button.classList.add('button');
    button.classList.add('is-black');
    button.classList.add('is-small');
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























    
    //Clearing Search History
    //const searchHistorySpace = document.getElementById('searchHistoryWrapper');
    const clearHistoryEl = document.getElementById('clearHistoryBtn');
    clearHistoryEl.addEventListener('click', clearSearchHistory);
    function clearSearchHistory(){
      localStorage.clear();
      searchHistory=[];
      searchHistorySpace.textContent='';
      let currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        if (!currentSearchHistory) {
          currentSearchHistory = [];
          localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
        }
    }
    
    var modalInfoSectionEl = document.getElementById("modalInfoTabContent");
    var modalStreamingSectionEl = document.getElementById("modalStreamingTabContent");
    
    
    //Toggle Modal Tabs
    const modalInfoTabLink = document.querySelector('.modalInfoTabLink');
    const modalStreamingTabLink = document.querySelector('.modalStreamingTabLink');
    
    // Add event listeners to the tab links
    modalInfoTabLink.addEventListener('click', () => {
      
      // Toggle the is-active class on the tab links
      modalInfoTabLink.parentElement.classList.add('is-active');
      modalStreamingTabLink.parentElement.classList.remove('is-active');
    });
    
    modalStreamingTabLink.addEventListener('click', () => {
      
      // Toggle the is-active class on the tab links
      modalStreamingTabLink.parentElement.classList.add('is-active');
      modalInfoTabLink.parentElement.classList.remove('is-active');
    });
    
    
    // Toggle Modal Content
    function showTabContent(tabID){
      var tabContents = document.querySelectorAll('.modal-card-body > div');
     // Hide all the modal content divs except the one containing the tabs
     tabContents.forEach(function(tabContent, index) {
      console.log("the problem is here");
      if (index > 2) {
        tabContent.style.display = 'none';
      }
    });
       // Show the selected tab content div
       var selectedTabContent = document.getElementById(tabID);
       selectedTabContent.style.display = 'block';
     }
    
