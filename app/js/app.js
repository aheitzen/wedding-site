$(document).ready(function () {
	$('.homePageLink').hover(
		function () {
			var self = this;
			setTimeout(function () {
				$('.homePageLink').not(self).addClass('not-hovered');
			}, 0);
		},
		function () {
			var self = this;
			setTimeout(function () {
				$('.homePageLink').not(self).removeClass('not-hovered');
			}, 0);
		}
	);
});
