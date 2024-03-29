
const ZOOM_START = 3.64;
const SENS_START = 0.44;
const OFFSET_START = {x:363,y:368.4};
const MAX_ZOOM = 10;
const MIN_ZOOM = 1;
const PIN_SCALE = 1/7;
const BANNER_SCALE = 1/10;

const canvas = document.getElementById('iceberg');
const ctx = canvas.getContext('2d');

let zoom = ZOOM_START;
let zoom_sensitivity = SENS_START;
let mouse_pos = { x: 0, y: 0 };
let is_dragging = false;
let offset = OFFSET_START;
let drag_offset = {x:0,y:0};

let width = window.innerWidth;
let height = window.innerHeight;

let sidebar = document.getElementById('sidebar');

function draw() {
	canvas.width = width = window.innerWidth;
	canvas.height = height = window.innerHeight;

	let sw = iceberg.width;
	let sh = iceberg.height;

	ctx.translate(width/2, height/2);
	ctx.scale(zoom, zoom);
	ctx.translate(-width/2, -height/2);
	// zoom at the center of the screen
	ctx.translate(offset.x, offset.y);
	if(loaded) {
		ctx.drawImage(iceberg, 0, 0, sw, sh, 0, 0, width, width*9/16);
	} else {
		cw = iceberg_cached.width;
		ch = iceberg_cached.height;
		ctx.drawImage(iceberg_cached, 0, 0, cw, ch, 0, 0, width, width*9/16);
		requestAnimationFrame(draw);
		return;
	}
	
	// draw the banner
	ctx.translate(480, 0);
	ctx.drawImage(banner, 0, 0, banner.width, banner.height, 0, 0, banner.width * BANNER_SCALE, banner.height * BANNER_SCALE);
	ctx.translate(-480, 0);

	// draw the pins
	IcebergItem.items.forEach(item => {
		if(!item.hidden) {
			const pin = item.icon;
			const pin_w = pin.width * PIN_SCALE/zoom;
			const pin_h = pin.height * PIN_SCALE/zoom;
			ctx.translate(item.position.x - pin_w/2, item.position.y - pin_h);
			ctx.drawImage(pin, 0, 0, pin.width, pin.height, 0, 0, pin_w, pin_h);
			ctx.translate(-(item.position.x - pin_w/2), -(item.position.y - pin_h));
		}
	});

	requestAnimationFrame(draw);
}

function ensure_in_bounds() {
	let left_limit = width - width / (2 * zoom);
	let right_limit = width / (2 * zoom);
	let upper_limit = height - height/(2 * zoom);
	let lower_limit = height / (2 * zoom);

	// clip to bounds
	offset.x = Math.min(offset.x,left_limit-width/2);
	offset.x = Math.max(offset.x,right_limit-width/2);
	offset.y = Math.max(offset.y,lower_limit-height/2);
	offset.y = Math.min(offset.y,upper_limit-height/2);
}

function get_clicked_item(mouse_x, mouse_y) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const m_x = width/2 - offset.x - (width - 2*mouse_x) / (2*zoom);
	const m_y = height/2 - offset.y - (height - 2*mouse_y) / (2*zoom);
	let click_distance = pin_clicked.width/2 * PIN_SCALE/zoom;
	let close_to = IcebergItem.items.filter(item => 
		click_distance >= Math.abs(item.position.x - m_x) &&
		click_distance >= Math.abs(item.position.y - m_y - (pin_clicked.height/2 * PIN_SCALE/zoom))
	);
	return (close_to.length > 0) ? close_to[0] : null;
}
const canvasMousedown = (event) => {
	// get coords from mouse or touch
	const clientX = event.clientX || event.targetTouches[0].pageX;
	const clientY = event.clientY || event.targetTouches[0].pageY;
	is_dragging = true;
	drag_offset = {
		x: clientX / zoom - offset.x,
		y: clientY / zoom - offset.y,
	};
}
canvas.addEventListener('mousedown', canvasMousedown);
canvas.addEventListener('touchstart', canvasMousedown);

const canvasMouseup = (event) => {
	let clicked_item = get_clicked_item(event.clientX, event.clientY);
	if(clicked_item !== null) {
		clicked_item.click();
		sidebar.style.display = 'block';
	}
}
canvas.addEventListener('mouseup', canvasMouseup);
canvas.addEventListener('touchend', canvasMouseup);

const windowMouseup = (event) => {
	is_dragging = false;
}
window.addEventListener('mouseup', windowMouseup);
window.addEventListener('touchend', windowMouseup);

const windowMousemove = (event) => {
	if(!is_dragging) return;
	// get coords from mouse or touch
	const clientX = event.clientX || event.targetTouches[0].pageX;
	const clientY = event.clientY || event.targetTouches[0].pageY;
	// drag iceberg around and stay in bounds
	offset.x = clientX / zoom - drag_offset.x;
	offset.y = clientY / zoom - drag_offset.y;
	ensure_in_bounds();
	return;
}
window.addEventListener('mousemove', windowMousemove);
window.addEventListener('touchmove', windowMousemove);

canvas.addEventListener('wheel', (event) => {
	event.preventDefault();
	zoom += zoom_sensitivity * ((event.deltaY < 0) ? 1: -1);
	// keep zoom within bounds
	zoom = Math.min(zoom, MAX_ZOOM);
	zoom = Math.max(zoom, MIN_ZOOM);
	ensure_in_bounds();
}, false);

canvas.oncontextmenu = function(event) { 
	event.preventDefault();
	event.stopPropagation();
}

window.addEventListener('resize', ensure_in_bounds);
window.addEventListener('keydown', (event) => {
	const ESCAPE_KEY = 27;
	if(event.keyCode === ESCAPE_KEY) {
		IcebergItem.unload_media();
		sidebar.style.display = 'none';
	}
});

let close_button = document.getElementById('close');
close_button.addEventListener('click', () => {
	IcebergItem.unload_media();
	sidebar.style.display = 'none';
});

draw();

