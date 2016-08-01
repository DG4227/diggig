function songConstructor(artist, artistTopTracks) {
  artistTopTracks.forEach(function(data) {
    new Song(artist, data)
  })
}
