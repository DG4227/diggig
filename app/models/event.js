const Event = (function() {
  return class {
    constructor(artist, data) {
      this.venue = data.venue.name
      this.location = data.formatted_location
      this.datetime = data.formatted_datetime
      this.ticket_status = data.ticket_status
      this.facebook_rsvp_url = data.facebook_rsvp_url
      artist.events.push(this)
      Store.events.push(this)
    }
  }
}())
