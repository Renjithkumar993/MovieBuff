
/*





// Function that fetches the Watchmode API data for streaming services //
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

// Function to dynamically set the modal content
    function printToModal(newArray) {
      console.log(newArray);
    // variables for the streaming service, service type, region, watch URL, and price
    var streamingServiceName = newArray.name;
      console.log(streamingServiceName);
    var accessType = newArray.type;
      console.log(accessType);
    var regionalAvailability = newArray.region;
      console.log(regionalAvailability);
    var webURL = newArray.web_url;
      console.log(webURL);
    var price = newArray.price;
      console.log(price);
    }
      

  */  

  // templated string to display all the movies from the array
  /*
  return `<div>
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
</div>`;
}
*/

    //watchmodeId = data.title_results[0].id;
    //runtimeEl = data.title_results[0].runtime_minutes;
    //genreEl = data.title_results[0].genre_name;
    //userRatingEl = data.title_results[0].user_rating;
    //criticScoreEl = data.title_results[0].critic_score;
    //usRatingEl = data.title_results[0].us_rating;
    //posterEl = data.title_results[0].poster;
    //similarTitlesEl = data.title_results[0].similar_titles;
    //trailerEl = data.title_results[0].trailer

    //streamingserviceName = data.title_results[i].name;
    //accessType = data.title_results[i].type;
    //regionalAvailability = data.title_results[i].region;
    //webURL = data.title_results[i].web_url;
    //price = data.title_results[i].price;

/*Ask about getting this set up in class
function runFetch(cardMovieTitle) { 

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

// Function to dynamically set the modal content
  function printToModal(newArray) {
    console.log(newArray);
  // variables for the streaming service, service type, region, watch URL, and price
  var streamingServiceName = newArray.name;
    console.log(streamingServiceName);
  var accessType = newArray.type;
    console.log(accessType);
  var regionalAvailability = newArray.region;
    console.log(regionalAvailability);
  var webURL = newArray.web_url;
    console.log(webURL);
  var price = newArray.price;
    console.log(price);
  }
    

// templated string to display all the movies from the array
/*
return `<div>
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
</div>`;
}
*/

  //watchmodeId = data.title_results[0].id;
  //runtimeEl = data.title_results[0].runtime_minutes;
  //genreEl = data.title_results[0].genre_name;
  //userRatingEl = data.title_results[0].user_rating;
  //criticScoreEl = data.title_results[0].critic_score;
  //usRatingEl = data.title_results[0].us_rating;
  //posterEl = data.title_results[0].poster;
  //similarTitlesEl = data.title_results[0].similar_titles;
  //trailerEl = data.title_results[0].trailer

  //streamingserviceName = data.title_results[i].name;
  //accessType = data.title_results[i].type;
  //regionalAvailability = data.title_results[i].region;
  //webURL = data.title_results[i].web_url;
  //price = data.title_results[i].price;

 /* 
Ask about getting this set up in class
function runFetch(cardMovieTitle) { 

//Watchmode API key
const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';

// Search for the movie using the Watchmode API's search functionality
const searchRequest = fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(cardMovieTitle)}`)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    // Check if any search results were returned
    if (data.title_results && data.title_results[0]) {
      console.log(data);
      // Extract the Watchmode ID for the first search result
      const watchmodeId = data.title_results[0].id;
      // Retrieve the streaming information for the movie using the Watchmode ID
      return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`);
    } else {
      // Handle the case where there are no search results
      throw new Error("No search results found");
    }
  });

// Perform another fetch request
const anotherFetchRequest = searchRequest.then(function(response) {
  return response.json();
}).then(function (data) {
  console.log(data);
  // Extract the Watchmode ID from the response
  const watchmodeId = data.title.id;
  // Retrieve the details for the movie using the Watchmode ID
  return fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${WMKey}&append_to_response=sources`);
}).then(function(response) {
  return response.json();
}).then(function (data) {
  console.log(data);
});

// Wait for both fetch requests to complete
Promise.all([searchRequest, anotherFetchRequest])
  .then(function(results) {
    console.log('Both fetch requests complete:', results);
  });
}
*/