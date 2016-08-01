const store = {
  artists:[],
  events:[]
}

$(function(){
  fadeLandingOnLoad()

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
})

  // Create new artist



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
  var artistIdData
  var albumData
  var bitData
  var artistTopTracks
  spotifyIdAJAX(artist)
}

function spotifyIdAJAX(artist) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
    success: function(data) {
      setSpotifyIdIfExists(data)
    },
    error: function() {

    }
  })
}

function setSpotifyIdIfExists(data) {
  if (data.artists.total > 0) {
    artistId = data.artists.items[0].id
    artistIdData = data.artists.items[0]
    spotifyArtistInfoAJAX(artistId)
  } else {
    artistId = null
  }
}

function spotifyArtistInfoAJAX(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    success: function(data) {
      albumData= data.items
      spotifyArtistTopTracksAJAX(id);
      spotifySimilarArtists(id);
    },
    error: function() {

    }
  })
}

function spotifySimilarArtists(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
    success: function(data) {
      similarData= data.artists
    },
    error: function() {
    }
  })
}

function spotifyArtistTopTracksAJAX(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
    success: function(data) {
      artistTopTracks = data.tracks
      bandsInTownAJAX(data.tracks[0].artists[0].name)
//       spotifyArtistData = data.artists.items[0]
//       spotifyArtistId = spotifyArtistData.id
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
        ajaxDataSendOff()
      },
      error: function() {

      }
  })
}

function ajaxDataSendOff() {
  artistConstructor(artistIdData, albumData, artistTopTracks, bitData)
}
