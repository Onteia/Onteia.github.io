
// class for aspect moment/funfact/etc.
// generated from csv/json file of the spreadsheet
class Item {
	constructor(title, description, depth, time) {
		this.title = title;
		this.description = description;
		this.depth = depth;
		this.time = time;
	}

	print() {
		console.log("Title: " + this.title + "\n" + 
			"Description: " + this.description + "\n" +
			"Depth: " + this.depth + "\n" +
			"Time: " + this.time
		);
	}
}







