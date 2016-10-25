(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // event.preventDefault(); - prevents default actions.

  var $submitBtn = $('button');
  var newMovie = $("input");
  var movieObj = {};

  $submitBtn.on('click', function(event) {
    event.preventDefault();
    movies = [];
    renderMovies();
    var movieName = newMovie.val();
    if(newMovie.val().length < 1) {
      alert('You did not enter a valid movie name!');
    }
    else {
      grabMovieData(movieName);
    }
  });

  function grabMovieData(movieName) {
    var $xhr = $.getJSON("https://www.omdbapi.com/?s=" + movieName);

    $xhr.done(function(data) {
      var movieData = data.Search;
  		if ($xhr.status !== 200) {
  			return;
  		}
      for(var i = 0; i < movieData.length; i++) {
        movieObj = {};
        movieObj.id = movieData[i].imdbID;
        movieObj.poster = movieData[i].Poster;
        movieObj.title = movieData[i].Title;
        movieObj.year = movieData[i].Year;
        // movieObj.plot = new Promise(grabPlot(movieObj.id));
        movies.push(movieObj);
      }
      console.log(movies);
      renderMovies();
    });
  }

  // function grabPlot(id) {
  //   var $xhr = $.getJSON('https://www.omdbapi.com/?i=' + id + '&plot=full');
  //
  //   $xhr.done(function (data) {
  //     console.log(data.Plot);
  //     return data.Plot;
  //   });
  // }

})();
