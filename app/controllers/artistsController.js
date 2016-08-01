var artist

function artistConstructor(artistIdData, albumData, artistTopTracks, bitData) {
  artist = new Artist(artistIdData)
  eventConstructor(artist, bitData)
  albumConstructor(artist, albumData)
  songConstructor(artist, artistTopTracks)
  displayAllEvents()
  displayPlaylist()
  displaySimilarArtists()
}


// function artistController(spotifyArtistData) {
//   var artistName = spotifyArtistData.name
//   var artistGenres = spotifyArtistData.genres.join(", ")
//   var artistImg = spotifyArtistData.images[1].url
//   var newArtist = new Artist(artistName,artistGenres,artistImg)
//   displayAllEvents()
//   displayPlaylist()


//SHOW EVENTS FROM BANDS IN TOWN
function displayAllEvents(){
  if (artist.events.length!==0){
    $('#eventsInfo').append(`<h3>Recent Tour Dates</h3>`)
    artist.events.forEach((event)=>displayEvent(event))
  }
  else{
    $('#eventsInfo').append(`<h3>No recent tours found!</h3>`)
  }
}

function displayEvent(event){
  addContentToEvents(`<b>${event.venue}</b>`)
  addContentToEvents(event.datetime)
  addContentToEvents(`<a href="${event.facebook_rsvp_url}">RSVP on Facebook</a><p>`)
}

var organizedSimilar = {artists:[]}

function organizeSimilar(obj){
  obj.forEach((artist)=>{
    if(artist.images[1].url){
      organizedSimilar.artists.push({name:artist.name, imgUrl:artist.images[1].url, listenUrl:artist.external_urls.spotify})
    }})
  organizedSimilar.artists = organizedSimilar.artists.slice(0,12)
}

function displaySimilarArtists(){
  $("#similarArtists").append(`<h3>Similar Artists</h3>`)
  organizeSimilar(similarData)
  handle($("#similar"), organizedSimilar)
}

function handle(containerId, data){
  var source = $(containerId).html();
  var template = Handlebars.compile(source);
  var html = template(data);
  addContentToSimilar(html)
}

function addContentTo(source, html){
  $(source).append(html+"<br>")
}

function addContentToEvents(html){
  addContentTo("#eventsInfo", html)
}

function addContentToSimilar(html){
  addContentTo("#similarArtists", html)
}

function displayPlaylist(){
  $('#topTracks').append(`<h3 style="color:white;">Top Tracks</h3>`)
  $('#topTracks').append(`<iframe src="https://embed.spotify.com/?uri=${artistIdData.uri}" width="100%" height="380" frameborder="0" allowtransparency="true"></iframe><p>`)
}
