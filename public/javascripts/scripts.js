$(document).ready(function(){

	var imdbId = $('.movie_imdb_id').text();

	$.getJSON("/moviedetails/" + imdbId, function(json) {
		if (json != "Nothing found."){
			$('.movie_artist').text(json.artist);
			$('.movie_released_year').text(json.released_year);
			$('.movie_img').attr("src", json.image);
		}
	 });
   
});