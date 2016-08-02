const Artist = (function() {
	return class {
		constructor(data, lastFmData) {
			this.name = data.name
			this.image = lastFmData.artist.image[4]['#text']
			this.bio = lastFmData.artist.bio.summary
			this.events = []
			this.topTracks = []
			this.albums = []
			this.genre = data.genres[0]
			Store.artists.push(this)
		}
	}
}())
