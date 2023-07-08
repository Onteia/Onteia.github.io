const SEED = "yoooooooooo????#$@?$@";
var srand = new Math.seedrandom(SEED);

// class for node on iceberg
class IcebergItem {
	static items = new Array();

	constructor(item) {
		if(typeof item !== "object") throw new Error("Item expected");
		this.item = item;
		this.position = {x: srand() * window.innerWidth, y: srand() * window.innerHeight};
		IcebergItem.items.push(this);
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
