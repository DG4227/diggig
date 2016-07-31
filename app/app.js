$(function(){
  // On Page Load Effects
  fadeLandingOnLoad()

  // Event listeners
  subtmitArtistSearch()


})

// EVENT LISTERNERS
function subtmitArtistSearch() {
    $('input:submit').on('click', function(event) {
      event.preventDefault()
      let artist_name = $('#artist_name').val()
      getArtistData(artist_name)
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
    artistIdData = data
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
      albumData= data
      spotifyArtistTopTracksAJAX(id)
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
      artistTopTracks = data
      bandsInTownAJAX(data.tracks[0].artists[0].name)
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
  // artistConstructor(albumData)
  debugger
}
