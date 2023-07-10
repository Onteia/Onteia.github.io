let iceberg_cached = new Image();
iceberg_cached.src = ICEBERG_CACHED;

let iceberg = new Image();
iceberg.src = ICEBERG_JPG;
let loaded = false;
iceberg.onload = function() {
	loaded = true;
}

let pin = new Image();
pin.src = PIN_PNG;

let popup = new Image();
popup.src = POPUP_PNG;
