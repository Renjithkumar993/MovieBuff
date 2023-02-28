var tmdbAPIKey = '60284bb58aafe269068499987d0a2596';
var watchmodeAPIKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf'; 
var omdbAPIKey = '83368b28'; //http://www.omdbapi.com/?i=tt3896198&apikey=83368b28
var imdbAPIKey = 'k_aw3dylfc'; 

/* This block of code should allow us to move between pages once we have selected our movie.
const redirectURL = "../movieinfo.html";
function redirectToPage(url){
  document.location = url;
}
redirectToPage(redirectURL);
*/

/*
// Saving searches to local storage.
// Taking in form input.
var searchInput = document.getElementById('searchField');

let searchCounter = localStorage.getItem("searchCounter") || 1; // get current value of searchCounter from local storage, or initialize to 1 if not set

document.querySelector('#searchForm').addEventListener('submit', function(e){
  e.preventDefault();
  console.log(searchInput.value.trim());
  let searchQuery = searchInput.value.trim();
  let key = "movieSearch" + searchCounter; // use the counter variable to create a unique key
  localStorage.setItem(key, searchQuery); // save search query to local storage with the unique key
  searchCounter++; // increment counter variable for next search
  localStorage.setItem("searchCounter", searchCounter); // update the value of searchCounter in local storage
  createHistoryButtons(searchQuery);
});
*/
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
