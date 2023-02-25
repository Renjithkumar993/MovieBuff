<<<<<<< Updated upstream:slides.js

const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';
const IMBDKey = '60284bb58aafe269068499987d0a2596';


let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${IMBDKey}&language=en-US`
var onAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${IMBDKey}&language=en-US`;
var videoURL = `GET https://api.themoviedb.org/3/movie/upcoming?api_key=${IMBDKey}`




$(".slidesImagesvideo").hide();


var posterImage = "";

fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
        for (var i = 0; i < data.results.length; i++) {
            var posterImage = data.results[i].poster_path;
            var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-3by4 poster is-rounded");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");
            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);

            carousel.append(column); 
        }
        $(".slidesImagesrecent").append(carousel); 

      
        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
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
            var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-3by4 poster is-rounded");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");
            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);

            carousel.append(column); 
        }
        $(".slidesImagesonair").append(carousel); 

      
        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
                1024: { items: 6 } 
            }
        });
    });


    
    fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
        
        for (var i = 0; i < data.results.length; i++) {

           
            var posterImage = data.results[i].backdrop_path;            ;
            var imageURLPoster = "https://image.tmdb.org/t/p/w780" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-5by4poster is-rounded");
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
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            items:1,
            margin:30,
            stagePadding:30,
            smartSpeed:300,
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
                1024: { items: 1 } 
            }
        });
    });








   var UpcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${IMBDKey}`;
   var VideoMovieURL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${IMBDKey}`;

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


    
            var keys = data.results[0].key;
              var Urltogo = "https://www.youtube.com/embed/" + keys;




              if (index === 0) {
                var videoUrlrender = `<iframe class="responsive" width="1250" height="600" src="${Urltogo}" frameborder="0" allowfullscreen allow ="autoplay"; mute></iframe>`;
              } else {
                var videoUrlrender = `<iframe class="responsive" width="560" height="315" src="${Urltogo}" frameborder="0" allowfullscreen></iframe>`;
              }

           
    
              var figure = $("<figure>").addClass("column ");
              var iframe = $(videoUrlrender);    
              figure.append(iframe);
              $(".slidesImagesvideo").append(figure);
            

  
              
    console.log(videoUrlrender)
             
            }
          
            
            )
       
            
            })
  
            
          })
          
      


    
      $(".Upcoming").on('click', function(){
        console.log("i am clicking");
        $(".slidesImagesrecent").hide();
        $(".slidesImagesonair").hide()
        $(".slidesImagesmain").hide()
        $(".search ").hide();  
        $(".slidesImagesvideo").show();
        
        
        })


=======

const WMKey = 'LoVEu2tw5mIYG5E37IhSybc6HmM2ovxVxxx8VJxf';
const IMBDKey = '60284bb58aafe269068499987d0a2596';


let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${IMBDKey}&language=en-US`
var onAirUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${IMBDKey}&language=en-US`;
var videoURL = `GET https://api.themoviedb.org/3/movie/upcoming?api_key=${IMBDKey}`




$(".slidesImagesvideo").hide();


$("searchBtn").on("click", function(){

    $(".slidesImagesrecent").hide();
    $(".slidesImagesonair").hide()
    $(".slidesImagesmain").hide()  
    
})






var posterImage = "";

fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
        for (var i = 0; i < data.results.length; i++) {
            var posterImage = data.results[i].poster_path;
            var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-3by4 poster is-rounded");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");
            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);

            carousel.append(column); 
        }
        $(".slidesImagesrecent").append(carousel); 

      
        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
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
            var imageURLPoster = "https://image.tmdb.org/t/p/w500" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-3by4 poster is-rounded");
            var img = $("<img>").attr("src", imageURLPoster).attr("alt", "Movie poster");
            figure.append(img);
            cardImage.append(figure);
            card.append(cardImage);
            column.append(card);

            carousel.append(column); 
        }
        $(".slidesImagesonair").append(carousel); 

      
        carousel.owlCarousel({
            rtl:true,
            items: 8, 
            loop: true, 
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
                1024: { items: 6 } 
            }
        });
    });


    
    fetch(nowPlayingUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var carousel = $("<div>").addClass("owl-carousel is-multiline container mt-5"); 
        
        for (var i = 0; i < data.results.length; i++) {

           
            var posterImage = data.results[i].backdrop_path;            ;
            var imageURLPoster = "https://image.tmdb.org/t/p/w780" + posterImage;

            var column = $("<div>").addClass("column ");
            var card = $("<div>").addClass("card");
            var cardImage = $("<div>").addClass("card-image");
            var figure = $("<figure>").addClass("image is-5by4poster is-rounded");
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
            margin: 10, 
            autoplay: true, 
            autoplayTimeout: 1350, 
            autoplayHoverPause: true, 
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            items:1,
            margin:30,
            stagePadding:30,
            smartSpeed:300,
            responsive: {
                0: { items: 1 }, 
                768: { items: 2 }, 
                1024: { items: 1 } 
            }
        });
    });








   var UpcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${IMBDKey}`;
   var VideoMovieURL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${IMBDKey}`;

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


    
            var keys = data.results[0].key;
              var Urltogo = "https://www.youtube.com/embed/" + keys;




              if (index === 0) {
                var videoUrlrender = `<iframe class="responsive" width="1250" height="600" src="${Urltogo}" frameborder="0" allowfullscreen allow ="autoplay"; mute></iframe>`;
              } else {
                var videoUrlrender = `<iframe class="responsive" width="560" height="315" src="${Urltogo}" frameborder="0" allowfullscreen></iframe>`;
              }

           
    
              var figure = $("<figure>").addClass("column ");
              var iframe = $(videoUrlrender);    
              figure.append(iframe);
              $(".slidesImagesvideo").append(figure);
            

  
              
    console.log(videoUrlrender)
             
            }
          
            
            )
       
            
            })
  
            
          })
          
      


    
      $(".Upcoming").on('click', function(){
        console.log("i am clicking");
        $(".slidesImagesrecent").hide();
        $(".slidesImagesonair").hide()
        $(".slidesImagesmain").hide()
        $(".search ").hide();  
        $(".slidesImagesvideo").show();
        
        
        })


>>>>>>> Stashed changes:develop/slides.js
        