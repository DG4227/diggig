const Event = (function() {
  return class {
    constructor(artist, data) {
      this.venue = data.venue.name
      this.location = data.formatted_location
      this.datetime = data.formatted_datetime
      this.ticket_status = data.ticket_status
      artist.events.push(this)
    }
  }
}())
