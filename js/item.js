
// class for aspect moment/funfact/etc.
// generated from csv/json file of the spreadsheet
class Item {
	static shown_item = null;
	constructor(title, description, depth, url) {
		this.title = title;
		this.description = description;
		this.depth = depth;
		this.url = url;
	}

	show() {
		let title = document.getElementById('title');
		title.textContent = this.title;
		let description = document.getElementById('description');
		description.textContent = this.description;
		let img = document.getElementById('thumbnail');
		img.src = this.url;
	}
}







