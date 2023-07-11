
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
		if(this.url.includes("youtu")) {
			const player = document.getElementById('ytplayer');
			player.src = "https://www.youtube-nocookie.com/embed/" + this.url.split('/')[4];
			player.style.height = '18.56vw';
		} else if(this.url.includes("twitter")) {
			const player = document.getElementById('twitter-widget-0');
			player.src = "https://platform.twitter.com/embed/Tweet.html?theme=dark&id=" + this.url.split('/')[5];
		} else if(this.url.includes("twitch")) {
			const player = document.getElementById('twitchplayer');
			player.src = "https://clips.twitch.tv/embed?clip=" + this.url.split('/')[3] + "&parent=github.com&parent=onteia.github.io";
			player.style.height = '18.56vw';
		}
		else {
			let img = document.getElementById('thumbnail');
			img.src = this.url;
		}
	}
}







