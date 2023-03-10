const WMKey = 'I8eqXJlEI9laBWJr8gRya9N4HVlAKNikLKwDLsfI';
const TMDBKey = '60284bb58aafe269068499987d0a2596';
const newsKey = '7213f56a2100dc7de82a324aa2075bce';

let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDBKey}&language=en-US`;
var onAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDBKey}&language=en-US`;
var videoURL = `GET https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDBKey}`;

// Added by Jared - Refresh page on logo click //
document.getElementById('logo').addEventListener('click', function() {
  location.reload();
});


$(".searchresultheading").hide();

var posterImage = "";

fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
          var posterImage = data.results[i].poster_path;
          var posterImageMovie = data.results[i].original_title;            
          var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;
          var column = $("<div>").addClass("column ");
          var card = $("<div>").addClass("card");
          var cardImage = $("<div>").addClass("card-image");
          var figure = $("<figure>").addClass("image is-3by1poster is-rounded");
          var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster").attr("id" , posterImageMovie).addClass("imagemodaltrending");

          figure.append(img);
          cardImage.append(figure);
          card.append(cardImage);
          column.append(card);
          carousel.append(column); 
        }

        $(".slidesImagesrecent").append(carousel); 
       
        $(".imagemodaltrending").on("click", function(){
          var movieNametrending = $(this).attr("id");
          console.log(movieNametrending);

        // Added by Jared -allow modal //
          getWatchmodeID(movieNametrending);
          modalToggle();
          setModalTitle(movieNametrending);
          return movieNametrending;
        })
   
        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 3 }, 
                768: { items: 5 }, 
                1024: { items: 6 } 
            }
        });
    });

    fetch(onAirUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
   
        for (var i = 0; i < data.results.length; i++) {

            var posterImage = data.results[i].poster_path;
            var posterImageMovie = data.results[i].name
            var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;
            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card ");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-3by4 poster is-rounded ");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster" ).attr("id" , posterImageMovie ).addClass("imagemodalonair");

            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);
            carousel.append(column); 
        }
        $(".slidesImagesonair").append(carousel); 

          $(".imagemodalonair").on("click", function(){
            var movieNameonair = $(this).attr("id")
            console.log(movieNameonair);

            // Added by Jared -allow modal //
            getWatchmodeID(movieNameonair);
            modalToggle();
            setModalTitle(movieNameonair);
            return movieNameonair;
          })

          var modalTitleEl = document.getElementById('modalTitle');

        function setModalTitle(movieTitle){
          modalTitleEl.textContent = movieTitle;
          console.log(modalMovieTitleEl.textContent)
        }

        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 3}, 
                768: { items: 5 }, 
                1024: { items: 6 } 
            }
        });
    });
    
    fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline"); 
        
        for (var i = 0; i < data.results.length; i++) {

            var posterImage = data.results[i].backdrop_path;            
            var imageURLPoster = "https://image.tmdb.org/t/p/w780" + posterImage;

            var column = $("<div>")
            var card = $("<div>")
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image image is-3by1 is-rounded ");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");

            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);
            carousel.append(column); 
        }
        $(".slidesImagesmain").append(carousel); 

        carousel.owlCarousel({
            rtl:true,
            items: 1, 
            loop: true, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            items:1,
            smartSpeed:600,
            responsive: {
                0: { items: 1 }, 
                768: { items: 1 }, 
                1024: { items: 1} 
            }
        });
    });


   var UpcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDBKey}`;
   var VideoMovieURL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${TMDBKey}`;

    fetch(UpcomingMovieUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var upcomingMovies = data.results;

    
      upcomingMovies.forEach(function(movie , index) {
        var movieId = movie.id;
        var videoUrl = VideoMovieURL.replace('{movie_id}', movieId);
        fetch(videoUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var trailers = data.results.filter(function(trailer) {
            return trailer.type === 'Trailer';
          });

            var keys = trailers[0].key;
              var Urltogo = "https://www.youtube.com/embed/" + keys + "?feature=oembed&enablejsapi=1";
              var videoUrlrender = `<iframe class="responsive"  src="${Urltogo}" frameborder="0" allowfullscreen></iframe>`
              var figure = $("<figure>").addClass("column is-flex is-justify-content-center");
              var iframe = $(videoUrlrender);    
              figure.append(iframe);
              $(".slidesImagesvideo").append(figure);
            }     
          )
        })
      })
          
        document.addEventListener('DOMContentLoaded', () => {
            // Functions to open and close a modal
            function openModal($el) {
              $el.classList.add('is-active');
            }
          
            function closeModal($el) {
              $el.classList.remove('is-active');
            }
          
            function closeAllModals() {
              (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
              });
            }
          
            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
              const modal = $trigger.dataset.target;
              const $target = document.getElementById(modal);
          
              $trigger.addEventListener('click', () => {
                openModal($target);
              });
            });
          
            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
              const $target = $close.closest('.modal');
          
              $close.addEventListener('click', () => {
                closeModal($target);
              });
            });
        });

        


  
// // function newsRender(){
//   fetch(newsURL)
//     .then(function(response){
//       return response.json();
//   })
//     .then(function(data){
//       var modalForNews =' ';
//       console.log(data)
//         for(i=fornumber; i < newsPerpage; i++){
//           var author = data.articles[i].author;
//           var description = data.articles[i].description;
//           var source = data.articles[i].source.name;
//           var imageUrl = data.articles[i].urlToImage;
//           var siteUrl = data.articles[i].url;
//           var title = data.articles[i].title;

//     modalForNews +=
//     `<div class="box container newsboxes has-background-black has-text-primary ">
//     <article class="media is-flex">
//       <div class="media-left">
//         <figure class="image is-128x128">
//           <img class="news image is-flex" src="${imageUrl} " alt="Image">
//         </figure>
//       </div>
//       <div class="media-content ">
//         <div class="content">
//           <p>
//             <strong class="titlenews has-text-white">${title}</strong>
//             <br>
//             <strong class="newsauther has-text-warning">${author}</strong> <small class="newsauthersource has-text-danger"> ${source}</small>
//             <br>
//           <p class="newsdescription ">    ${description}   </p>
//         <a class="newslinktoURL" href="${siteUrl}" target="_blank" >Click to read more</a>
//           </p>
//         </div>
//     </article>
//   </div>`
// }

//   $("#newsmodalwrapper").html(modalForNews);
//   })
// // }

// newsRender();
const newsURL = 'http://api.mediastack.com/v1/news?' + new URLSearchParams({
  access_key: newsKey,
  keywords: 'upcoming movies',
  categories: 'entertainment',
  languages: 'en',

  limit: 50

});
const linkspagination = $(".pagination-link");
let fornumber = 0;
let newsPerpage = 10;
var imageNoimage = "./assets/no-image-.jpg"

linkspagination.on("click", function(){
  var pageNumber = $(this).text();
  
  if (pageNumber === "1"){
    fornumber = 0;
    newsPerpage = 10;
  } else if(pageNumber === "2"){
    fornumber = 10;
    newsPerpage = 20;
  }else if(pageNumber === "3"){
    fornumber = 20;
    newsPerpage = 30;
  }else if(pageNumber === "4"){
    fornumber = 30;
    newsPerpage = 40;
  }else if(pageNumber === "5"){
    fornumber = 40;
    newsPerpage = 50;
  }
  newsRender();
 })
function newsRender(){
  fetch(newsURL)
    .then(function(response){
      return response.json();
  })
    .then(function(data){
      var modalForNews =' ';
      console.log(data)
        for(i=fornumber; i < newsPerpage; i++){

          if(!data.data[i].image){
            imageUrl = imageNoimage;
          
          }
          var author = data.data[i].author;
          var description = data.data[i].description;
          var source = data.data[i].source;
          var imageUrl = data.data[i].image || imageNoimage;
          var siteUrl = data.data[i].url;
          var title = data.data[i].title;

    modalForNews +=
    `<div class="box container newsboxes has-background-black has-text-primary ">
    <article class="media is-flex">
      <div class="media-left">
        <figure class="image is-128x128">
          <img class="news image is-flex" src="${imageUrl} " alt="Image">
        </figure>
      </div>
      <div class="media-content ">
        <div class="content">
          <p>
            <strong class="titlenews has-text-white">${title}</strong>
            <br>
            <strong class="newsauther has-text-warning">${author}</strong> <small class="newsauthersource has-text-danger"> ${source}</small>
            <br>
          <p class="newsdescription ">    ${description}   </p>
        <a class="newslinktoURL" href="${siteUrl}" target="_blank" >Click to read more</a>
          </p>
        </div>
    </article>
  </div>`
}

  $("#newsmodalwrapper").html(modalForNews);
  })

};


 newsRender();




$("#searchBtn").on("click", function(){
  $(".hidewhensearch").hide();
  $(".searchresultheading").show();
})

function toggleNavbarBurger() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector(`#${burger.dataset.target}`);
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
}

const navbarBurger = document.querySelector('.navbar-burger');
navbarBurger.addEventListener('click', toggleNavbarBurger);

// Also added by Jared //
function getWatchmodeID (movieName){
  //Watchmode API key
  const WMKey = "I8eqXJlEI9laBWJr8gRya9N4HVlAKNikLKwDLsfI";
    fetch(`https://api.watchmode.com/v1/search/?apiKey=${WMKey}&type=movie&search_field=name&search_value=${encodeURIComponent(movieName)}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check if any search results were returned
        if (data.title_results && data.title_results[0]) {
          // Extract the Watchmode ID for the first search result
          watchmodeId = data.title_results[0].id;
          fetchMovieInfo(watchmodeId);
          fetchStreamingServices(watchmodeId);
        } else {
            // Handle the case where there are no search results
            throw new Error("No search results found");
          }
        });
  };

function fetchMovieInfo(){
// Retrieve the streaming information for the movie using the Watchmode ID
fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${WMKey}`)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Extract the movie information 
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
            <li>Viewer Rating: <strong id="vwrRtng">${userRatingEl}</strong>/10</li>
            <li>Critic Rating: <strong id="critRtng">${criticScoreEl}</strong>/100</li>
          </ul>
        </div>

        <div>
          <br>
          <a href="${trailerEl}" class="button is-primary" target="_blank">View the Trailer</a>
        </div>
          <br>
      </div>
    </div>
  </div>`;
      //$('movieInfoWrapper').html(infoElmt);
      movieInfoWrapperEl.innerHTML = infoElmt;
    });
};

function fetchStreamingServices(watchmodeId) {
  // Retrieve the streaming information for the movie using the Watchmode ID
  fetch(`https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${WMKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Ensure that data is an array before using reduce()
      if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
      }

      // Extract the streaming services from the streaming information
      const newArray = data.reduce((accumulator, current) => {
        if (!accumulator.some(
            (obj) => obj.source_id === current.source_id && obj.name === current.name)
        ) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

    //Initialize wrapper as an empty string
    const modalStreamingWrapper = document.getElementById("streamingServicesWrapper");
    modalStreamingWrapper.innerHTML = "";
    //Initialize streaming element as an empty string
    var streamingElmt = "";
    // Initializing other Elements

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
                <li>Streaming region ${regionalAvailability}</li>
                <li><a href = "${webURL}" target="_blank">Watch Here!</a></li>
                <li>Service cost: ${price}</li>
              </ul>
            </div>
          </div>
        </div>`;
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
};
      
// Function to let us open/close the modal //
function modalToggle() {
  $(document).ready(function () {
    $("#myModal").toggle();
  });
}

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


$(".logoimage").on("click", function(){
  location.reload();
})

// Watch Later for Renjith //

// Watch Later Section //
openWatchLaterButtonEl.addEventListener('click', watchLaterModalToggle);
document.getElementById('watchLaterBtn').addEventListener('click', function() {
  saveWatchLater(modalTitleEl);
});

var watchLater = JSON.parse(localStorage.getItem('watchLater'));

// Adds new entry to local storage when the watch later button is clicked
function saveWatchLater(modalTitleEl) {
  // Retrieve the "watchLater" array from local storage
  let watchLater = JSON.parse(localStorage.getItem('watchLater'));

  // If the "watchLater" array does not exist, create it
  if (!watchLater) {
    watchLater = [];
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }

  // Save to "watchLater" after page load
  if (!watchLater.includes(modalTitleEl.textContent)) {
    $(document).ready(function() {
      watchLater.push(modalTitleEl.textContent); // Fixed so that it now saves to local storage in an array!
      localStorage.setItem('watchLater', JSON.stringify(watchLater));
    });
  }
}

// Remove from Watch Later Functionality
function removeWatchLaterEntry(){
}

//Set Watch Later to be generated upon page loading //
window.onload = function(){
  WatchLaterListEl.innerHTML='';
  var watchLaterData = JSON.parse(localStorage.getItem('MyWatchLaterList')) || []; // use empty array as default value if search history not found in local storage
  // Loop through the array
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


