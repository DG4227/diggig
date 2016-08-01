const store = {
  artists:[],
  events:[]
}

$(function(){
  // On Page Load Effects
  fadeLandingOnLoad()
  // Event listeners

  $('a[href="#search"]').on('click', function(event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });

  $('#search, #search button.close').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $(this).removeClass('open');
    }
  });

  submitArtistSearch()
  $('#search').removeClass('open');

  // Create new artist

})


function submitArtistSearch() {
    $('button:submit').on('click', function(event) {
      $('#search').removeClass('open');
      $("#artistInfo").empty()
      $("#topTracks").empty()
      $("#eventsInfo").empty()
      event.preventDefault()
      let artist_name = $('#artist_name').val()
      getArtistData(artist_name)
      $('#artist_name').val("")
    })
}

// ELEMENT FUNCTIONS

function fadeLandingOnLoad() {
  $('#brand').hide().fadeIn(2000)
}

// AJAX FUNCTIONS

function getArtistData(artist) {
  var artistId
  var artistData
  var bitData
  // var spotifyArtistData
  spotifyIdAJAX(artist)
  bandsInTownAJAX(artist)
  $(document).ajaxStop(function () {
    if(spotifyArtistData != undefined){
      artistController(spotifyArtistData)
      }
    else{
      throw "Artist not found"}
    // eventConstructor()
    // albumConstructor()
    // This where all the data from the AJAX calls will funnel into and kick off the creation of instances in their respective controllers
  });
}

function spotifyIdAJAX(artist) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
    success: function(data) {
      spotifyArtistData = data.artists.items[0]
      spotifyArtistId = spotifyArtistData.id
      spotifyArtistInfoAJAX(spotifyArtistId)
    },
    error: function() {

    }
  })
}

function bandsInTownAJAX(artist) {
    return $.ajax({
      method: "GET",
      url: "http://api.bandsintown.com/artists/" + artist + "/events.json?api_version=2.0&app_id=diggig",
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data) {
        bitData = data
      },
      error: function() {

      }
  })
}


function spotifyArtistInfoAJAX(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
    success: function(data) {
      spotifyTopSongs = data
    },
    error: function() {

    }
  })
}
