function artistConstructor(spotifyArtistData) {
  var artistName = spotifyArtistData.name
  var artistGenres = spotifyArtistData.genres.join(", ")
  var artistImg = spotifyArtistData.images[1].url
  var newArtist = new Artist(artistName,artistGenres,artistImg)
  displayArtistInfo(newArtist)
  displayPlaylist()
  // # A continuation from this ajax bullshit
}


function displayArtistInfo(newArtist){
  let info = document.createElement("p")
  let photo = document.createElement("img")
  info.textContent = newArtist.name
  $(".details").append(info)
}

function displayPlaylist(){
  $('#topTracks').append(`<iframe src="https://embed.spotify.com/?uri=${spotifyArtistData.uri}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>`)
}

