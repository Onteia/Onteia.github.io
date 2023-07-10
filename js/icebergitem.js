const SEED = "yoooooooooo????#$@?$@";
var srand = new Math.seedrandom(SEED);

// class for node on iceberg
class IcebergItem {
	static items = new Array();
	static hidden_items = new Array();

	constructor(item) {
		if(typeof item !== "object") throw new Error("Item expected");
		this.item = item;
		this.position = {x: srand() * window.innerWidth, y: srand() * window.innerWidth*9/16};
		this.hidden = false;
		IcebergItem.items.push(this);
	}

	click() {
		this.hide();
		this.item.show();
	}

	hide() {
		// only one pin should be hidden at once
		IcebergItem.hidden_items.forEach(item => item.hidden = false);
		this.hidden = true;
		IcebergItem.hidden_items.push(this);
	}

	static unhide_all() {
		IcebergItem.hidden_items.forEach(item => {
			item.hidden = false;
			Item.collapse();
		});
	}

	print() {
		this.item.print();
		console.log(this.position);
		return;
	}

}

// these are for testing purposes; generate icebergitems from csv instead
let thing1 = new IcebergItem(new Item("thing one", null, null, null));
let thing2 = new IcebergItem(new Item("thing twoooo", null, null, null));
