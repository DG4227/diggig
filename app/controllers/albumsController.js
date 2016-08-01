function albumConstructor(artist, albumData) {
  albumData.forEach(function(data) {
    new Album(artist, data)
  })
}
