
let canvas;

	let bg_width = 0;
	let bg_height = 0;

	let bgImg = new Image();
	bgImg.src = BACKGROUND_GIF;
	bgImg.addEventListener("load", function() {
		bg_width = this.naturalWidth;
		bg_height = this.naturalHeight;
	});

	document.addEventListener("mousemove", (event) => {
		let mouse_x = event.x - Math.floor(bg_width/2);
		let mouse_y = event.y - Math.floor(bg_height/2);
		document.body.style.backgroundPosition = `${mouse_x}px ${mouse_y}px`;
	});

