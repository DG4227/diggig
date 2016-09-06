const store = {
  artists:[],
  events:[]
}

$(function(){
  fadeLandingOnLoad()
  searchBarActions()
  submitArtistSearch()
  $('#search').removeClass('open')
})

function fadeLandingOnLoad() {
  $('.brand').hide().fadeIn(1300)
  $('center').hide().fadeIn(1300)
}

function searchBarActions(){
  $('a[href="#search"], #fixedbutton').on('click', function(event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });

  $('#search, #search button.close').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $(this).removeClass('open');
    }
  });
}

function submitArtistSearch() {
  $('button:submit').on('click', function(event) {
    clearPreviousInfo()
    event.preventDefault()
    let artist_name = $('#artist_name').val()
    getArtistData(artist_name)
    $('#artist_name').val("")
  })
}

function clearPreviousInfo(){
  $('#search').removeClass('open');
  $("#artistInfo").empty()
  $("#topTracks").empty()
  $("#eventsInfo").empty()
  $("#quotes").remove()
  $("#clear").html("")
  $('#artistAlbums').remove()
}

function scrollTo() {
  $('html, body').animate({
    scrollTop: $("#artistInfo").offset().top -30
  }, 1000);
}

function getArtistData(artist) {
  var artistId
  var artistIdData
  var albumData
  var bitData
  var artistTopTracks
  var lastFmData
  spotifyIdAJAX(artist)
}

function spotifyIdAJAX(artist) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
    success: function(data) {
      setSpotifyIdIfExists(data)
      let norm_name = data.artists.items[0].name
      bandsInTownAJAX(norm_name)
      lastFmAJAX(norm_name)
    },
    error: function() {

    }
  })
}

function setSpotifyIdIfExists(data) {
  if (data.artists.total > 0) {
    let artistId = data.artists.items[0].id
    artistIdData = data.artists.items[0]
    sendAllSpotifyRequests(artistId)
  } else {
    let artistId = null
    $("#artistInfo").append(`<h3 style="color:white;">No results found!</h3>`)
  }
}

function sendAllSpotifyRequests(artistId){
  spotifyArtistInfoAJAX(artistId)
  spotifyArtistTopTracksAJAX(artistId);
  spotifySimilarArtists(artistId);
}

function spotifyArtistInfoAJAX(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    success: function(data) {
      albumData= data.items

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

function ajaxAggregator(){

}

function spotifyArtistTopTracksAJAX(id) {
  return $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
    success: function(data) {
      artistTopTracks = data.tracks
      // bandsInTownAJAX(data.tracks[0].artists[0].name)
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

function lastFmAJAX(artist) {
  return $.ajax({
    method: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=dd175f30902c81d7efbd9bee0b5398b5&format=json`,
    success: function(data) {
      lastFmData = data
      ajaxDataSendOff()
    },
    error: function() {
    }
})
}


function ajaxDataSendOff() {
  artistConstructor(artistIdData, albumData, artistTopTracks, bitData, lastFmData)
}
