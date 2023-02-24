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

// call the function that takes in the search, using prompt for now, will change to search box
const searchQueryInput = prompt("enter a movie title to search for:");

TMDb_(searchQueryInput)
    .then((movies) => {
        console.log(movies);
        for (let i = 0; i < movies.length; i++) {
            var posterPath = `https://image.tmdb.org/t/p/original${movies[i].poster_path}`;
            var backdropPath = `https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`;
            var movieTitle = movies[i].title;
            var movieReleaseDate = movies[i].release_date;
            var overview = movies[i].overview;

            $('#moviePoster').attr('src', posterPath);

            $('#movieTitle').html(movieTitle);
            $('#releaseDate').html(movieReleaseDate);
            $('#overview').html(overview);
        }

})
    .catch((error) => {
        console.error(error);
});