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

  // Adds new entry to local storage
  function saveWatchLater(){
    watchLater.push(modalMovieTitleEl.text());
    localStorage.setItem('MyWatchLaterList', watchLater);
  }

  // Creates the elements in the watch later modal
  function newWatchLaterEntry(){
  const watchLaterBodyEl = document.getElementById('watchLaterWrapper'); // replace with ID of search history display element
  watchLaterBodyEl.innerHTML=''; // use innerHTML instead of textContent to clear previous contents
  const watchLaterData = JSON.parse(localStorage.getItem('watchLaterList')) || []; // use empty array as default value if search history not found in local storage
  }

// Remove from Watch Later Functionality
  function removeWatchLaterEntry(){
    
  }
