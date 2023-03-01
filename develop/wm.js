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

watchLater = [];

//Add to Watch Later Functionality
  const watchLaterButtonEl = document.getElementById('watchLaterBtn');
  watchLaterButtonEl.addEventListener('click', saveWatchLater);
  const modalMovieTitleEl = document.getElementById("modalTitle");

  // Adds new entry to local storage when the watch later button is clicked
  function saveWatchLater(){
    console.log("the watch later button el has been clicked");
    watchLater.push(modalMovieTitleEl.textContent); // Fixed so that it now saves to local storage in an array!
    localStorage.setItem('MyWatchLaterList', JSON.stringify(watchLater));
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



// Copied from tmdb.js just to see if this works //

// API Calls to get more information //
  // 1. Function that fetches the Watchmode API data for streaming services //
  function runFetch2(itemName) {
    // Return a promise
    return new Promise(function(resolve, reject) {
      //Watchmode API key
      const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

      // Search for the movie using the Watchmode API's search functionality
      fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(itemName)}`)
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          // Check if any search results were returned
          if (data.title_results && data.title_results[0]) {
            console.log(data);
            // Extract the Watchmode ID for the first search result
            watchmodeId = data.title_results[0].id;
            // Retrieve the streaming information for the movie using the Watchmode ID
            return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${WMKey}`);
          } else {
            // Handle the case where there are no search results
            throw new Error("No search results found");
          }
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          // Extract the movie information
          setModalTitle(itemName) // This pops in a little slow... I wonder if there is another way to make it work better?
          console.log(data);

          const movieInfoWrapperEl = document.getElementById("movieInfoWrapper");
          var infoElmt = '';

            //Initializing Elements
            runtimeEl = data.runtime_minutes;
              console.log(runtimeEl);
            filmTitleEl = data.title;
              console.log(filmTitleEl);
            genreEl = data.genre_name;
              console.log(genreEl);
            userRatingEl = data.user_rating;
              console.log(userRatingEl);
            criticScoreEl = data.critic_score;
              console.log(criticScoreEl);
            usRatingEl = data.us_rating;
              console.log(usRatingEl);
            backdropEl = data.backdrop;
              console.log(backdropEl);
            similarTitlesEl = data.similar_titles;
              console.log(similarTitlesEl);
            trailerEl = data.trailer
              console.log(trailerEl);
            plotOverviewEl = data.plot_overview
              console.log(plotOverviewEl);
            infoElmt += /*html*/ `<div>
              <div class = "modalInfoBodyContent">
                <div class = "media-content">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src="${backdropEl}" alt="Movie backdrop">
                    </figure>
                  </div>
                  <div class = "content">
                    <h2><strong>${filmTitleEl}</strong></h2>
                      <ul>
                      <li> Film Runtime: ${runtimeEl} minutes</li>
                      <li> Title Genre: ${genreEl}</li>
                      <li> MPA Film Rating: ${usRatingEl}</li>
                      </ul>
                  </div>

                  <div class="content">
                    ${plotOverviewEl}
                  </div>

                  <div class="media-content">
                    <p class="title is-4">Scores:</p>
                    <p class="subtitle is-6">Viewer rating: ${userRatingEl}</p>
                    <p class="subtitle is-6">Critic Rating ${criticScoreEl}</p>
                  </div>

                  <div>
                  <a href ="${trailerEl}" class="button is-danger is-rounded">View the Trailer</a>
                  </div>

                  <div>
                    <p>If you like <strong>${filmTitleEl}</strong>, you may also like ${similarTitlesEl}. Be sure to also check out these films!
                  </div>

                </div>
              </div>
            </div>`
            
            console.log(infoElmt);
            //$('movieInfoWrapper').html(infoElmt);
            movieInfoWrapperEl.innerHTML = infoElmt;
        });
    })
  }   

    // 2. Function that fetches the Watchmode API data for streaming services //
    function runFetch(itemName) {
      // Return a promise
      return new Promise(function(resolve, reject) {
        //Watchmode API key
        const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

        // Search for the movie using the Watchmode API's search functionality
        fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(itemName)}`)
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            // Check if any search results were returned
            if (data.title_results && data.title_results[0]) {
              console.log(data);
              // Extract the Watchmode ID for the first search result
              watchmodeId = data.title_results[0].id;
              // Retrieve the streaming information for the movie using the Watchmode ID
              return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`);
            } else {
              // Handle the case where there are no search results
              throw new Error("No search results found");
            }
          })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            // Extract the streaming services from the streaming information
            console.log(data);
            const newArray = data.reduce((accumulator, current) => {
              if (!accumulator.some(obj => obj.source_id === current.source_id && obj.name === current.name)) {
                accumulator.push(current);
              }
              return accumulator;
            }, []);
            // Remove duplicate results.
            console.log(newArray);
            console.log(newArray.length);
            // Resolve the promise with the data
            resolve(newArray);
            //Initialize wrapper as an empty string
            const modalStreamingWrapper = document.getElementById("streamingServicesWrapper");
            modalStreamingWrapper.innerHTML = '';
            //Initialize streaming element as an empty string
            var streamingElmt = '';
            // Initializing other Elements 
            modalTitleEl.innerHTML = '';
            
            // Loop through streaming services
            for (let i = 0; i < newArray.length; i++) {
              console.log (streamingElmt);
              console.log(newArray[i]);
              var streamingServiceName = newArray[i].name;
                console.log(streamingServiceName);
              var accessType = newArray[i].type;
                console.log(accessType);
              var regionalAvailability = newArray[i].region;
                console.log(regionalAvailability);
              var webURL = newArray[i].web_url;
                console.log(webURL);
              var price = newArray[i].price;
                console.log(price);
              streamingElmt += `<div>
              <button class = "accordion">${streamingServiceName}</button>
              <div class = "panel">
                <div>
                  <ul>
                    <li>Accesible by ${accessType}</li>
                    <li>Available in ${regionalAvailability}</li>
                    <li><a> href = "${webURL}>Web URL</a></li>
                    <li>Service cost ${price}</li>
                  </ul>
                </div>
              </div>
            </div>`
              //printToModal(newArray[i]);
              console.log(streamingElmt);
              //modalStreamingWrapper.appendChild(streamingElmt);
            }
            // setting the content inside the wrapper to display all the streaming services from the array with the templated string
            $('#streamingServicesWrapper').html(streamingElmt);

            console.log(streamingElmt)
            modalStreamingWrapper.innerHTML = streamingElmt;
            console.log(modalStreamingWrapper.innerHTML);
            
            //  Just to help me bug fix //
            if (streamingElmt.localeCompare(modalStreamingWrapper.innerHTML) === 0) {
            console.log("Both strings are equivalent.");
            } else {
            console.log("The strings are not equivalent."); //Why aren't the equivalent??
            }
            
            // Applies the logic to the accordion elements //
            setAccordionLogic(); 
          })
          .catch(function(error) {
            // Handle any errors that occur in the fetch or processing of data
            console.error(error);
            // Reject the promise with the error
            reject(error);
          });
      });
    }

    //Modal Section 
    // Function to open and close modal.
    function modalToggle(){
      $(document).ready(function() {
        $('#myModal').toggle();
      });
    }

