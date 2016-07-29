$(function(){ // on document ready,
  $('input:submit').on('click', function(event){ //attach a listener to my submit, such that on click
    var artist_name
    event.preventDefault(); // we prevent default
    artist_name = $('#artist_name').val() // we get the artist name


    $.ajax({
      method: "GET",
      url: "http://api.bandsintown.com/artists/" + artist_name + "/events.json?api_version=2.0&app_id=diggig"
    }).done(function(data){
      data.forEach(function(element){
        element.venue
      })
    })
  })
})
