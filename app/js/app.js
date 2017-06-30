import FormHandler from './rsvpForm'
import Accomodations from './accommodations'

$(document).ready(function () {
	var formHandler = new FormHandler(),
		accommodations = new Accomodations()

	$('#rsvp-form').submit((e) => {
		e.preventDefault();

		var formData = formHandler.buildFormData()
		formData.accepts = formData.accepts === 'accepts'

		if (formHandler.isReady && formHandler.verifyRsvp(formData)) {
			formHandler.addRsvp(formData).success(() => {
				console.log('success')
			}).error((error) => {
				console.log('error', error)
			}).done(() => {
				console.log('done')
			})
		} else {
			console.log(formHandler.error)
			// invalid form message handler goes here
		}
	})

	$('.homePageLink').hover(
		function () {
			setTimeout(() => {
				$('.homePageLink').not(this).addClass('not-hovered');
			}, 0);
		},
		function () {
			setTimeout(() => {
				$('.homePageLink').not(this).removeClass('not-hovered');
			}, 0);
		}
	);
});
