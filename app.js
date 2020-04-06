const RED_FROG = './img/red.jpg'
const BLUE_FROG = './img/blue.jpg'
const STONE = './img/default.jpg'
let FIRST_TIME_GAME = true;

function incrementTime() {
	document.getElementById("timer").innerHTML = ++second;
}

let timerInterval = null;

function startTimer() {
	// stoping the previous timer (if any)
	stopTimer();
	second = 0;
	timerInterval = setInterval(incrementTime, 1000);
}

function stopTimer() {
	clearInterval(timerInterval);
}

function startNewGame() {
	startTimer();
	// reset all images back to initial state:
	for (i = 1; i <= 3; i++) {
		document.getElementById(i.toString()).src = RED_FROG
	};
	for (i = 5; i <= 7; i++) {
		document.getElementById(i.toString()).src = BLUE_FROG
	};
	document.getElementById(4).src = STONE;
}

function showSolution() {
	let hint = document.getElementById('solution');
	hint.style.display === 'none' ? hint.style.display = 'block' : hint.style.display = 'none';
}

// Returns true if all blue images are on the left side or the red ones are on the right:
function checkWin(id) {
	if ([1, 2, 3].includes(id)) {
		return document.getElementById(id.toString()).src.slice(-5) === 'e.jpg';
	}
	if ([5, 6, 7].includes(id)) {
		return document.getElementById(id.toString()).src.slice(-5) === 'd.jpg';
	}
	return true;
};

function myClick(id) {
	if (FIRST_TIME_GAME) {
		startTimer();
		FIRST_TIME_GAME = false;
	}
	// Red/Left frog is clicked: 
	// Check the adjacent place:
	if (document.getElementById(id.toString()).src.slice(-5) === 'd.jpg') {
		if (document.getElementById((id + 1).toString()).src.slice(-5) === 't.jpg') {
			document.getElementById((id).toString()).src = STONE;
			document.getElementById((id + 1).toString()).src = RED_FROG;
		} else if (document.getElementById((id + 2).toString()).src.slice(-5) === 't.jpg') {
			document.getElementById((id).toString()).src = STONE;
			document.getElementById((id + 2).toString()).src = RED_FROG;
		} else {
			return;
		}

		// Blue/Right frog is clicked: 
	} else if (document.getElementById(id.toString()).src.slice(-5) === 'e.jpg') {
		if (document.getElementById((id - 1).toString()).src.slice(-5) === 't.jpg') {
			document.getElementById((id).toString()).src = STONE;
			document.getElementById((id - 1).toString()).src = BLUE_FROG;
		} else if (document.getElementById((id - 2).toString()).src.slice(-5) === 't.jpg') {
			document.getElementById((id).toString()).src = STONE;
			document.getElementById((id - 2).toString()).src = BLUE_FROG;
		} else {
			return;
		};
	}

	// Check if the win condition is satisfied:
	function didUserWin() {
		let myImages = [1, 2, 3, 4, 5, 6, 7];
		if (myImages.every(checkWin)) {
			return true;
		}
		return false;
	}

	if (didUserWin()) {
		stopTimer();
		let finishTime = document.getElementById("timer").innerHTML;
		alert(`You Win! You finisehd the game in ${finishTime} seconds!`);
		// startNewGame();
		FIRST_TIME_GAME = false;
	};
};

// TODO: improve timer to show minutes, hours, etc.
// TODO: use switch statements
