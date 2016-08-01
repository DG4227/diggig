const Song = (function() {
  return class {
    constructor(artist, data) {
      this.artist = artist
      this.title = data.name
      this.length = data.duration_ms
      this.album = data.album.name
      this.preview = data.preview_url
      this.image = data.album.images[1].url
      this.artist.topTracks.push(this)
      Store.songs.push(this)
    }
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000)
      var seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }
  }
}())
