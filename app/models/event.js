<<<<<<< HEAD
const Event = (function() {


	return class {
		// getting from both bandsintown and spotify; need id for top tracks
		constructor(title,datetime,facebook_rsvp_url) {
			this.title = title
      this.datetime = datetime
      this.facebook_rsvp_url = facebook_rsvp_url
      store.events.push(this)
		}
	}
})
