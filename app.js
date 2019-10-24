function startNewGame() {
	// reset all images back to initial state:
	for (i = 1; i <= 3; i++) {
		document.getElementById(i.toString()).src = './img/red.jpg'
	};
	for (i = 5; i <= 7; i++) {
		document.getElementById(i.toString()).src = './img/blue.jpg'
	};
	document.getElementById(4).src = './img/default.jpg';
}

function showSolution() {
	var x = document.getElementById("solution");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

// Returns true if all blue images are on the left side or the red ones are on the right:
function checkWin(id) {
	if ([1, 2, 3].includes(id)) {
		return document.getElementById(id.toString()).src.slice(-5) == 'e.jpg';
	} else if ([5, 6, 7].includes(id)) {
		return document.getElementById(id.toString()).src.slice(-5) == 'd.jpg';
	} else {
		return true;
	}
};

function myClick(id) {
	console.log(document.getElementById(id.toString()).src);
	// Red / Left frog is clicked: 
	// Check the adjacent place:
	if (document.getElementById(id.toString()).src.slice(-5) == 'd.jpg') {
		if (document.getElementById((id + 1).toString()).src.slice(-5) == 't.jpg') {
			document.getElementById((id).toString()).src = './img/default.jpg';
			document.getElementById((id + 1).toString()).src = './img/red.jpg';
		} else if (document.getElementById((id + 2).toString()).src.slice(-5) == 't.jpg') {
			document.getElementById((id).toString()).src = './img/default.jpg';
			document.getElementById((id + 2).toString()).src = './img/red.jpg';
		} else {
			return;
		}

		// Blue / Right frog is clicked: 
	} else if (document.getElementById(id.toString()).src.slice(-5) == 'e.jpg') {
		if (document.getElementById((id - 1).toString()).src.slice(-5) == 't.jpg') {
			document.getElementById((id).toString()).src = './img/default.jpg';
			document.getElementById((id - 1).toString()).src = './img/blue.jpg';
		} else if (document.getElementById((id - 2).toString()).src.slice(-5) == 't.jpg') {
			document.getElementById((id).toString()).src = './img/default.jpg';
			document.getElementById((id - 2).toString()).src = './img/blue.jpg';
		} else {
			return;
		};
	}

	// Checks if the win condition is satisfied:
	var myImages = [1, 2, 3, 4, 5, 6, 7];
	if (myImages.every(checkWin)) {
		alert('You Win!');
		startNewGame();
	};
};