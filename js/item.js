
// class for aspect moment/funfact/etc.
// generated from csv/json file of the spreadsheet
class Item {
	static shown_item = null;
	constructor(title, description, depth, time) {
		this.title = title;
		this.description = description;
		this.depth = depth;
		this.time = time;
		this.hidden = true;
	}

	show() {
		this.hidden = false;
		if(Item.shown_item !== null && Item.shown_item !== this) Item.shown_item.hidden = true;
		Item.shown_item = this;
	}

	static collapse() {
		if(Item.shown_item === null) return;
		Item.shown_item.hidden = true;
		Item.shown_item = null;
	}

	print() {
		console.log("Title: " + this.title + "\n" + 
			"Description: " + this.description + "\n" +
			"Depth: " + this.depth + "\n" +
			"Time: " + this.time
		);
	}
}







