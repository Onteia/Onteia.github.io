const SEED = "yoooooooooo????#$@?$@";
var srand = new Math.seedrandom(SEED);

// class for node on iceberg
class IcebergItem {
	static items = new Array();

	constructor(item) {
		if(typeof item !== "object") throw new Error("Item expected");
		this.item = item;
		this.position = {x: srand() * window.innerWidth, y: srand() * window.innerHeight};
		this.icon = pin_clicked;
		if(item.depth === 0) {
			this.icon = pin_0;
		} else if(item.depth === 1) {
			this.icon = pin_1;
		} else if(item.depth === 2) {
			this.icon = pin_2;
		} else if(item.depth === 3) {
			this.icon = pin_3;
		} else if(item.depth === 4) {
			this.icon = pin_4;
		} else if(item.depth === 5) {
			this.icon = pin_5;
		}
		IcebergItem.items.push(this);
	}

	click() {
		IcebergItem.unload_media();
		this.icon = pin_clicked;
		this.item.show();
	}

	static unload_media() {
		const yt = document.getElementById('ytplayer');
		if(yt !== null) {
			yt.src = "";
			yt.style.height = '0vw';
		}
		const thumb = document.getElementById('thumbnail');
		if(thumb !== null) thumb.src = "";
		const twt = document.getElementById('twitter-widget-0');
		if(twt !== null) {
			twt.src = "";
			twt.style.height = '0px';
		}
		const twtfallback = document.getElementById('twtfallback');
		twtfallback.style.display = 'none';
		const twitch = document.getElementById('twitchplayer');
		if(twitch !== null) {
			twitch.src = "";
			twitch.style.height = '0px';
		}
	}

	print() {
		this.item.print();
		console.log(this.position);
		return;
	}

}

// these are for testing purposes; generate icebergitems from csv instead
let thumbnail = new IcebergItem(new Item(`sahyj_`, `Promised an obscene amount of money to play contract during subathon, then called out Aspect for cheating (using HUD): \"You fuck !\"`, 3, `https://i.imgur.com/rMvMZCA.png`));

let yt = new IcebergItem(new Item(`Neon Ninja Suit`, `The Neon Ninja Suit is a suit introduced in HITMAN III as a reward for beating any contract in Tier 8 of the Elusive Target Arcade. The suit was notable for when it was used in maps like Sapienza's \"The Icon\" or Paris' \"The Showstopper\". The use of the suit in Aspecticor's stream has been cited in 204 cases of permanent blindness across the globe, and 1500+ partial eyesight loss in North America alone. The Canadian government has been heavily sanctioned by multiple countries for not immediately taking legal action against Aspecticor.`, 1, `https://youtube.com/shorts/itdcLLrOQFM`));

//let two = new IcebergItem(new Item("money ballstreams", "ahh the good old days", 3, "https://youtube.com/shorts/ISq_0dIJmAo"));

let twt = new IcebergItem(new Item(`aspecticor fan club at UCB`, `yooo test description`, 0, `https://twitter.com/punchingwaves/status/1619931644881965056`));
let twt2 = new IcebergItem(new Item(`Hitman Horse`, `HITMAAAAAAAAAAAAAAAAAAN HORSEEEEEEEEEEEEE`, 0, `https://twitter.com/Linkus7/status/1579278016613490689`));


let twitch = new IcebergItem(new Item(`ALTF4`, `Not to be confused with Super Alt F4, the program that Aspecticor uses to close Hitman Freelancer whenever he fails (L bozo), ALTF4 is a rage-inducing game where a clumsy knight traverses traps. Aspecticor streamed this at the beginning of his career, and to this day has not completed it, recently giving the outburst \"The creator of ALTF4 hasn't even completed the game, okay???\" The background music, entitled \"Round and Round,\" is said to trigger his PTSD to this day.`, 5, `https://clips.twitch.tv/BelovedHorribleRabbitRickroll-F1NFa8ayNG5Ri0Qz`));


let ytplaylist = new IcebergItem(new Item(`Gamer Gauntlet`, ``, 1, `https://youtube.com/playlist?list=PL8hyRqs__Q8AWTEMtLcqjJEXkkrzmSDLH`));


let empty = new IcebergItem(new Item(` Gauntlet`, ``, 1, `https://www.youtube.com/watch?v=St1crxwRmis`));




