function artistConstructor() {
  let artistName = spotifyArtistData.name
  let artistGenres = spotifyArtistData.genres.join(", ")
  let artistImg = spotifyArtistData.images[1].url
  var newArtist = new Artist(artistName,artistGenres,artistImg)

  // # A continuation from this ajax bullshit
}
