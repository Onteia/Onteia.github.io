
const ZOOM_START = 1.88;
const SENS_START = 0.44;
const OFFSET_START = {x:350,y:207.5};
const MAX_ZOOM = 10;
const MIN_ZOOM = 1;

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

let iceberg = new Image();
iceberg.src = ICEBERG_JPG;

function draw() {
	canvas.width = width = window.innerWidth;
	canvas.height = height = window.innerHeight;

	let sw = iceberg.width;
	let sh = iceberg.height;

	ctx.translate(width/2, height/2);
	ctx.scale(zoom, zoom);
	ctx.translate(-width/2, -height/2);
	ctx.translate(offset.x, offset.y);
	ctx.drawImage(iceberg, 0, 0, sw, sh, 0, 0, width, width*9/16);

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

canvas.addEventListener('mousedown', (event) => {
	is_dragging = true;
	drag_offset = {
		x: event.clientX / zoom - offset.x,
		y: event.clientY / zoom - offset.y,
	};
});

canvas.addEventListener('mouseup', (event) => {
	is_dragging = false;
});

canvas.addEventListener('mousemove', (event) => {
	if(!is_dragging) return;
	// drag iceberg around and stay in bounds
	offset.x = event.clientX / zoom - drag_offset.x;
	offset.y = event.clientY / zoom - drag_offset.y;
	ensure_in_bounds();
	return;
});

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

const SEED = "123";
var rng = new Math.seedrandom(SEED);
console.log(rng());
console.log(rng());

draw();

