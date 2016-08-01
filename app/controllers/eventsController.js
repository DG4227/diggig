function eventConstructor(artist, bitData) {
  bitData.forEach(function(data) {
    new Event(artist, data)
  })
}
