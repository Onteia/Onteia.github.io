
// class for aspect moment/funfact/etc.
// generated from csv/json file of the spreadsheet
class Item {
	static shown_item = null;
	constructor(title, description, depth, time) {
		this.title = title;
		this.description = description;
		this.depth = depth;
		this.time = time;
	}

	show() {
		let title = document.getElementById('title');
		title.textContent = this.title;
		let description = document.getElementById('description');
		description.textContent = this.description;
		let time = document.getElementById('time');
		time.textContent = this.time;
	}

	print() {
		console.log("Title: " + this.title + "\n" + 
			"Description: " + this.description + "\n" +
			"Depth: " + this.depth + "\n" +
			"Time: " + this.time
		);
	}
}







