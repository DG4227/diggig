
function artistController(spotifyArtistData) {
  var artistName = spotifyArtistData.name
  var artistGenres = spotifyArtistData.genres.join(", ")
  var artistImg = spotifyArtistData.images[1].url
  var newArtist = new Artist(artistName,artistGenres,artistImg)
  displayAllEvents()
  displayPlaylist()
  // # A continuation from this ajax bullshit

}

//SHOW EVENTS FROM BANDS IN TOWN
function displayAllEvents(){
  addContent(`<h3>Recent Tour Dates</h3>`)
  bitData.forEach((event)=>displayEvent(event))
}

function displayEvent(event){
  addContent(`<b>${event.title}</b>`)
  addContent(event.formatted_datetime)
  addContent(`<a href="${event.facebook_rsvp_url}">RSVP on Facebook</a><p>`)
}

function addContent(html){
  $("#eventsInfo").append(html+"<br>")
}

function displayPlaylist(){
  $('#topTracks').append(`<iframe src="https://embed.spotify.com/?uri=${spotifyArtistData.uri}" width="100%" height="380" frameborder="0" allowtransparency="true"></iframe>`)
}

