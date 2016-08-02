var artist

function artistConstructor(artistIdData, albumData, artistTopTracks, bitData, lastFmData) {
  artist = new Artist(artistIdData, lastFmData)
  eventConstructor(artist, bitData)
  albumConstructor(artist, albumData)
  songConstructor(artist, artistTopTracks)
  displayArtistInfo()
  displayAllEvents()
  displayPlaylist()
  displaySimilarArtists()
  displayAlbums(albumData)
  $('.my-flipster').flipster();
  addQuote()
  scrollTo()
}

//SHOW EVENTS FROM BANDS IN TOWN
function displayAllEvents(){
  if (artist.events.length!==0){
    $('#eventsInfo').append(`<h3>Recent Tour Dates</h3>`)
    artist.events.forEach((event)=>displayEvent(event))
  }
  else{
    $('#eventsInfo').append(`<h3>No upcoming events found!</h3>`)
  }
}

function displayEvent(event){
  addContentToEvents(`<b>${event.venue}</b>`)
  addContentToEvents(event.datetime)
  addContentToEvents(event.location)
  addContentToEvents(`<a href="${event.facebook_rsvp_url}">RSVP on Facebook</a><p>`)
}

function displayAlbums(albums) {
  albums.forEach(function (album) {
    $('.coverflow').append(`<li class=""><img src="${album.images[1].url}"/></li>`)
  })
}

function organizeSimilar(obj){
  organizedSimilar = {artists:[]}
  obj.forEach(
    (artist)=>{
      // if(artist.images[1].url && artist.external_urls.spotify){
        organizedSimilar.artists.push(
          {name:artist.name,
          imgUrl:artist.images[1].url,
          listenUrl:artist.external_urls.spotify}
        )
      // }
    }
  )
  if(organizedSimilar.artists.length > 12){organizedSimilar.artists = organizedSimilar.artists.slice(0,12)}
  return organizedSimilar
}

function displaySimilarArtists(){
  // if(similarData.length !=0){$("#clear").html("<h3>Similar Artists</h3>")}
  organizeSimilar(similarData)
  if(organizedSimilar.artists.length ===12){$("#clear").html("<h3>Similar Artists</h3>")}
  handle($("#similar"), organizedSimilar)
  similarData=[]
}

function displayArtistInfo() {
  var $template = $('#artist-info-block').html()
  $('#artistInfo').append($template)
  $('#artistInfo img').attr('src', `${artist.image}`)
  $('.artist-bio p').append(artist.bio)
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
  addContentTo("#clear", html)
}

function displayPlaylist(){
  $('#topTracks').append(`<h3 style="color:white;">Top Tracks</h3>`)
  $('#topTracks').append(`<iframe src="https://embed.spotify.com/?uri=${artistIdData.uri}" width="100%" height="400px" frameborder="0" allowtransparency="true"></iframe><p>`)
}

function addQuote(){

  let rand = Math.floor((Math.random() * 123) + 1)*2;
  let quote = quotes[rand]
  $("#quotes").html(`<h1 class="quote">${quote}</h1>`)
  document.getElementById("quotes").style.marginTop = "50px"
  document.getElementById("quotes").style.paddingTop = "100px"
  document.getElementById("quotes").style.paddingBottom = "100px"
  document.getElementById("quotes").style.paddingRight = "100px"
  document.getElementById("quotes").style.paddingLeft = "100px"
  // $("#quotes").append(`<center><p style='color:white;'>- quotes from nitch.com -</p></center>`)

}
