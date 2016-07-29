const store = {
  artists:[],
  events:[],
}

function logResults(json){
  console.log(json);
}

$(function(){ // on document ready,
  $('input:submit').on('click', function(event){ //attach a listener to my submit, such that on click
    var artist_name
    event.preventDefault(); // we prevent default
    artist_name = $('#artist_name').val() // we get the artist name

    $.ajax({
      method: "GET",
      url: "http://api.bandsintown.com/artists/" + artist_name + "/events.json?api_version=2.0&app_id=diggig",
      dataType: "jsonp",
      jsonpCallback: "logResults"
    }).done(function(data){
      data.forEach(function(element){
        event_title = element.title
        event_dateTime = element.datatime
        event_fbUrl = element.facebook_rsvp_url
      })
    });

    $.ajax({
      method: "GET",
      url: `https://api.spotify.com/v1/search?q=${artist_name}&type=artist`
    }).done(function(data){
      return artist_data_1 = data.artists.items[0]
      artist_id = artist_data_1.id
      // artist_genre = artist_data_1.genres //=>["dance pop", "pop", "r&b", "urban contemporary"]
      // artist_img = artist_data_1.images[2].url
    });

    return $.ajax({
      method:"GET",
      url: `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=US`
    }).done(function(data){
      artist_data_2 = data
      return artist_data_2
      debugger
    })
  })
})
