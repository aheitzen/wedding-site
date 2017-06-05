$(document).ready(function () {
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
