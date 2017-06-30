export default class Accomodations {

	constructor () {
		this.items = $('#accomodations > ul > li')
		this.items.click(this.itemClicked.bind(this))
	}

	itemClicked(e) {
		this.items.not(e.currentTarget).addClass('slideDown')

		setTimeout(() => {
			this.items.not(e.currentTarget).addClass('hide')
			$(e.currentTarget).parent().addClass('slide')
		}, 500)
	}

}