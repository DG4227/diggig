var artist

function artistConstructor(artistIdData, albumData, artistTopTracks, bitData) {
  artist = new Artist(artistIdData)
  eventConstructor(artist, bitData)
  albumConstructor(artist, albumData)
  songConstructor(artist, artistTopTracks)
  debugger
}
