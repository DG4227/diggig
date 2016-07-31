function artistConstructor(spotifyArtistData) {
  var artistName = spotifyArtistData.name
  var artistGenres = spotifyArtistData.genres.join(", ")
  var artistImg = spotifyArtistData.images[1].url
  var newArtist = new Artist(artistName,artistGenres,artistImg)
  displayArtistInfo(newArtist)
  // # A continuation from this ajax bullshit
}


function displayArtistInfo(newArtist){
  let info = document.createElement("p")
  let photo = document.createElement("img")
  info.textContent = newArtist.name
  $(".details").append(info)
}

function displayAlbums(){

}

function displayEvents(){

}
