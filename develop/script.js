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

 //Creating Search History Buttons
function createHistoryButtons(){
  const searchHistorySpace = document.getElementById('searchHistoryWrapper'); // replace with ID of search history display element
  searchHistorySpace.innerHTML=''; // use innerHTML instead of textContent to clear previous contents
  const localStorageData = JSON.parse(localStorage.getItem('searchHistory')) || []; // use empty array as default value if search history not found in local storage

  localStorageData.forEach(searchTerm => {
    const button = document.createElement('button'); // create button element
    button.classList.add('history-button'); // add class to button for styling
    button.textContent = searchTerm;
    button.addEventListener('click', function() {
      //performSearch(searchTerm); // replace with function that performs a search using the clicked search term
    });
    searchHistorySpace.appendChild(button);
  });
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

//Locic for accordion animation 
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

