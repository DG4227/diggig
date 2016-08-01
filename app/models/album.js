const Album = (function() {
  return class {
    constructor(artist, data) {
      this.artist = artist
      this.title = data.name
      this.cover = data.images[0].url
      this.artist.albums.push(this)
      Store.albums.push(this)
    }
  }
}())
