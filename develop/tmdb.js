// function that fetches the TMDb API
async function TMDb_(searchQuery) {
  //TMDb api Key
  const TMDb_KEY = '60284bb58aafe269068499987d0a2596';
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

function setModalTitle(cardMovieTitle){
modalTitleEl.textContent = cardMovieTitle
}

function setModalTitle(cardMovieTitle){
  modalTitleEl.textContent = cardMovieTitle
}

// Add an event listener to the movie card wrapper
document.getElementById('movieCardWrapper').addEventListener('click', function(event) {
  // Check if the clicked element is a movie card
  console.log("movieCardWrapper has been clicked!");
  if (event.target.closest('.card')) {
    // Get the movie title from the clicked card
    console.log("You clicked a movie card!");
    const card = event.target.closest('.card');
    const title = card.querySelector('.title');
    console.log(title.textContent);
    let cardMovieTitle = title.textContent;
    runFetch(cardMovieTitle)
    runFetch2(cardMovieTitle)
    modalToggle()
    setModalTitle(cardMovieTitle)
      .then(function() {
        //modalToggle();
        //setModalTitle(cardMovieTitle);
      })
      .catch(function(error) {
        // Handle the error
        console.error(error);
      });
  } else {
    console.log("nope, try again")
  }
});

var modalTitleEl = document.getElementById('modalTitle');
var modalInfoSectionEl = document.getElementById('modalInfoTabContent');
var modalStreamingSectionEl = document.getElementById('modalStreamingTabContent');


// API Calls to get more information //

  // 1. Function that fetches the Watchmode API data for streaming services //
  function runFetch2(cardMovieTitle) {
    // Return a promise
    return new Promise(function(resolve, reject) {
      //Watchmode API key
      const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

      // Search for the movie using the Watchmode API's search functionality
      fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(cardMovieTitle)}`)
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
          // Extract the streaming services from the streaming information
          console.log(data);
        });
    })
  }   






























    // 2. Function that fetches the Watchmode API data for streaming services //
    function runFetch(cardMovieTitle) {
      // Return a promise
      return new Promise(function(resolve, reject) {
        //Watchmode API key
        const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

        // Search for the movie using the Watchmode API's search functionality
        fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(cardMovieTitle)}`)
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
            
            if (streamingElmt.localeCompare(modalStreamingWrapper.innerHTML) === 0) {
            console.log("Both strings are equivalent.");
            } else {
            console.log("The strings are not equivalent."); //Why aren't the equivalent??
            }
            
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

    // Get the "Cancel" button element
    const closeModalBtn = document.getElementById('closeModalBtn');
    // Add an event listener to the "Cancel" button
    closeModalBtn.addEventListener('click', function() {
      // Call the modalToggle function to close the modal
      modalToggle();
    });