const games = document.querySelectorAll('.gameScore'); // 3 games per round
const ends = document.querySelectorAll('.endScore'); // 4 ends per game
const arrows = document.querySelectorAll('.arrow'); // 5 arrows per end
const buttons = document.querySelectorAll(".wrapper");
const scores = document.querySelectorAll('label');
const total = document.getElementById('total');
let arrow = 0;
let scoring = "300";

function getEndScore(arrow) {
	return arrow.parentElement.lastElementChild;
}
function getGameScore(arrow) {
	return getEndScore(arrow).parentElement.parentElement.lastElementChild;
}
function updateEndText(end) {
	end.innerText = end.points + "";
};
function updateGameText(game) {
	game.innerText = game.points + " (" + game.x + "X)";
};
function buttonClick(button) {
	let target = arrow;
	let isX = 0;
	let end;
	let game;
	let total;
	let text = button.value;
	let points;
	let prev = {};
	let nextTarget = arrow + 1;
	if (button.value === "CLEAR ARROW") {
		text = "";
		if (arrows[target].value != "") {
			target = arrow;
		} else {
			target = (arrow - 1 < 0 ? arrow : arrow - 1);
		}
		nextTarget = (arrow == 0 ? arrow : arrow - 1);
		points = 0;
	} else {
		if (arrow === 59) {
			nextTarget = arrow;
		}
		if (button.value === "X") {
			points = (scoring === "300" ? 5 : 6);
			isX = 1;
		} else {
			points = parseInt(button.value);
		}
	}

	end = getEndScore(arrows[target]); //innerText
	game = getGameScore(arrows[target]); //innerText
	total = document.querySelector('#total');

	//get previous values
	prev.arrow = {};
	prev.arrow.points = arrows[target].points;
	prev.arrow.isX = arrows[target].isX;

	//update arrow
	arrows[target].points = points;
	arrows[target].value = text;
	arrows[target].isX = isX;

	//get differences
	let pointDifference = arrows[target].points - prev.arrow.points;
	let xDifference = arrows[target].isX - prev.arrow.isX;

	//update end
	end.points += pointDifference;
	updateEndText(end);

	//update game
	game.points += pointDifference;
	game.x += xDifference;
	updateGameText(game);

	//update total Score
	total.points += pointDifference;
	total.x += xDifference;
	updateGameText(total);

	//focus next arrow
	arrows[nextTarget].focus();
};
function toggleScores() {
	let delta = (scoring === "300" ? -1 : 1);
	for (let i = 0; i < arrows.length; i++) {
		if (arrows[i].isX === 1) {
			arrows[i].points += delta;
			let end = getEndScore(arrows[i]);
			let game = getGameScore(arrows[i]);
			let total = document.querySelector('#total');
			end.points += delta;
			updateEndText(end);
			game.points += delta;
			updateGameText(game);
			total.points += delta;
			updateGameText(total);
		}
	}
}
function clearArrows() {
	for (let i = 0; i < arrows.length; i++){
		arrows[i].value = "";
	}
}
function setScoring(){
	if (document.getElementById(scores[0].htmlFor).checked) {
		scoring = "300";
	} else {
		scoring = "360";
	}
}

for (let i = 0; i < arrows.length; i++) {
	arrows[i].addEventListener('focus', (event) => {
		arrow = i;
	});
	arrows[i].points = 0;
	arrows[i].isX = false;
}//keep
for (let i = 0; i < ends.length; i++) {
	ends[i].points = 0;
}
for (let i = 0; i < games.length; i++) {
	games[i].points = 0;
	games[i].x = 0;
}
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', (event) => {
		buttonClick(buttons[i]);
	});
}
for (let i = 0; i < scores.length; i++) {
	scores[i].addEventListener('click', (event) => {
		if (scoring !== scores[i].innerText) {
			scoring = scores[i].innerText;
			toggleScores();
		}
	});
}

arrows[arrow].focus();
total.points = 0;
total.x = 0;
clearArrows();
setScoring();
updateGameText(total);