export default class FormHandler {

	constructor () {
		this.rsvps = []
		this.error = ''
		this.isReady = false
		this.getRsvps()

		this.buildFormData = this.buildFormData.bind(this)
		this.verifyRsvp = this.verifyRsvp.bind(this)
		this.addRsvp = this.addRsvp.bind(this)
		this.getRsvps = this.getRsvps.bind(this)
	}

	buildFormData () {
		let formData = {}

		$('#rsvp-form').serializeArray().forEach((item) => {
			formData[item.name] = item.value
		})

		return formData
	}

	verifyRsvp (formData){
		this.error = ''
		if (!formData.names || formData.names === null || formData.names === '') {
			this.error = 'Missing Name(s)'
			return false
		}
		else if (formData.accepts === null) {
			this.error = 'Missing Accepts/Declines Choice'
			return false
		} else {
			return true
		}
	}

	addRsvp (rsvp) {
		this.rsvps.push(rsvp)
		return $.ajax({
			type: 'PUT',
			url: 'https://aplusk-eed13.firebaseio.com/.json',
			data: JSON.stringify(this.rsvps)
		})
	}

	getRsvps () {
		$.ajax({
			type: 'GET',
			url: 'https://aplusk-eed13.firebaseio.com/.json'
		}).success((rsvps) => {
			this.rsvps = rsvps || this.rsvps
		}).error((error) => {
			this.error = error
		}).done(() => {
			this.isReady = true
		})
	}
}
