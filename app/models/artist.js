const Artist = (function() {
	return class {
		constructor(data) {
			this.name = data.name
			this.events = []
			this.topTracks = []
			this.albums = []
			this.genre = data.genres[0]
			this.picture = data.images[0].url
			Store.artists.push(this)
		}
	}
}())
