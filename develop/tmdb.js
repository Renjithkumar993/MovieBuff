// function that fetches the TMDb API
function TMDb_() {
    //TMDb api Key
    const TMDb_KEY = '60284bb58aafe269068499987d0a2596';
    //Initializing search parameters
    var search = '';

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDb_KEY}&query=${search}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}