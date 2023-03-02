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
  let storedSearchHistory = localStorage.getItem('searchHistory');
  let storedSearchHistoryArray = JSON.parse(storedSearchHistory);
  storedSearchHistoryArray.push(searchQuery);
  let updatedStoredSearchJSON = JSON.stringify(storedSearchHistoryArray);
  localStorage.setItem('searchHistory', updatedStoredSearchJSON);
  createHistoryButtons();
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

  localStorageData.forEach((searchTerm) => {
    const button = document.createElement('button');
    button.classList.add('history-button');
    button.textContent = searchTerm;
    button.addEventListener('click', () => {
      // perform search for the clicked search term
      performSearch(searchTerm);
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
  let currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (!currentSearchHistory) {
      currentSearchHistory = [];
      localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
    }
}

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
  if (index !== 0) {
    tabContent.style.display = 'none';
  }
});
   // Show the selected tab content div
   var selectedTabContent = document.getElementById(tabID);
   selectedTabContent.style.display = 'block';
 }
