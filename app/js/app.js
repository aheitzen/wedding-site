$(document).ready(function () {
	$('.homePageLink').hover(
		function () {
			$('.homePageLink').not(this).addClass('not-hovered')
		},
		function () {
			$('.homePageLink').not(this).removeClass('not-hovered')
		}
	)
})
