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
    localStorage.setItem('MyWatchLaterList', watchLater);
  }


// Remove from Watch Later Functionality
  function removeWatchLaterEntry(){
  
  }

  const WatchLaterListEl = document.getElementById("watchLaterListWrapper");
//Set Watch Later to be generated upon page loading //
window.onload = function(){
  WatchLaterListEl.innerHTML='';
  const watchLaterData = JSON.parse(localStorage.getItem('watchLaterList')) || []; // use empty array as default value if search history not found in local storage
// Loop through the array
for (var i = 0; i < watchLaterData.length; i++) {
    // Get the name of the current item
    var itemName = watchLaterData[i].name;

    // Create a new div element
    var div = $('<div></div>');
  
    // Set the content of the div to the item name
    div.text(itemName);
  
    // Append the div to the document body or another parent element
    $('body').append(div);
  }
}

// Set watch later to be updated every time a new entry is added //
function generateNewWatchLaterContent(){
  WatchLaterListEl.innerHTML='';
  const watchLaterData = JSON.parse(localStorage.getItem('watchLaterList')) || []; // use empty array as default value if search history not found in local storage
// Loop through the array
for (var i = 0; i < watchLaterData.length; i++) {
    // Get the name of the current item
    var itemName = watchLaterData[i].name;

    // Create a new div element
    var div = $('<div></div>');
  
    // Set the content of the div to the item name
    div.text(itemName);
  
    // Append the div to the document body or another parent element
    $('body').append(div);
  }
}

