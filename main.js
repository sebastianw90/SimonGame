var powerLight = document.getElementById('powerLight');
var powerBut = document.getElementById('powerBut');
var startLight = document.getElementById('startLight');
var resetLight = document.getElementById('resetLight');
var strictLight = document.getElementById('strictLight');
var disp = document.getElementById('display');
var dispText = document.getElementById('dispText');
var instrModal = document.getElementById('instrModal');
var winModal = document.getElementById('winModal');
var soundButsColl = document.getElementsByClassName('soundButs');
var soundButs = [];
for (var i = 0; i < soundButsColl.length; i++) {
	soundButs.push(soundButsColl[i]);
}
var audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audioYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var arrOfProp = [[soundButs[0], 'redButActive', audioRed], [soundButs[1], 'blueButActive', audioBlue], 
				[soundButs[2], 'greenButActive', audioGreen], [soundButs[3], 'yellowButActive', audioYellow]];
var butSequence = [];
var clickLength = 800;
var isOn = false;
var isStrict = false;
var round = 0;
var roundIter = 0;
var playerMove = 0;
var errorSound = new Audio('http://www.pacdv.com/sounds/interface_sound_effects/sound96.wav');
var repeat = false;
var isStart = false;
var finishSound = new Audio('http://www.pacdv.com/sounds/applause-sounds/app-29.wav');
var timer = '';
var interval = '';


function deactivSoundButs() {
	for (var i = 0; i < soundButs.length; i++) {
		soundButs[i].disabled = true;
	}
}

deactivSoundButs();

function activSoundButs() {
	for (var i = 0; i < soundButs.length; i++) {
		soundButs[i].disabled = false;
	}
}

function powerClick() {
	if (isOn == false) {
		isOn = true;
		clickLength = 800;
		powerLight.style.backgroundColor = '#0d0';
		disp.style.backgroundColor = '#001500';
		dispText.style.opacity = '1';
		dispText.style.color = '#090';
		setTimeout(function() {
			dispText.innerHTML = '00';
		},clickLength);
	} else {
		isOn = false;
		isStrict = false;
		isStart = false;
		round = 0;
		roundIter = 0;
		butSequence = [];
		playerMove = 0;
		clearInterval(interval);
		powerLight.style.backgroundColor = '#020';
		startLight.style.backgroundColor = '#020';
		strictLight.style.backgroundColor = '#020';
		disp.style.backgroundColor = '#010';
		dispText.style.opacity = '0.2';
		dispText.style.color = '#030';
		dispText.innerHTML = "88";
		for (var i = 0; i < soundButs.length; i++) {
			soundButs[i].classList.remove(arrOfProp[i][1]);
		}
		deactivSoundButs();
	}
}

function startClick() {
	if (isOn == true && isStart == false) {
		isStart = true;
		startLight.style.backgroundColor = '#0d0';
		setTimeout(function() {
			startLight.style.backgroundColor = '#020';
		},300);
		gameAI();
	}
}

function resetClick() {
	if (isStart == true) {
		clearInterval(interval);
		resetLight.style.backgroundColor = '#0d0';
		setTimeout(function() {
			resetLight.style.backgroundColor = '#020';
		},300);
		powerClick();
		powerClick();
		setTimeout(startClick, clickLength * 1.5);
	}
}

function strictClick() {
	if (isOn == true) {
		if (isStrict == false) {
			strictLight.style.backgroundColor = '#0d0';
			isStrict = true;
		} else {
			strictLight.style.backgroundColor = '#020';
			isStrict = false;
		}
	}
}

function instrClick() {
	instrModal.style.display = 'block';
}

function gotItClick() {
	instrModal.style.display = 'none';
}

function winClick() {
	powerClick();
	powerClick();
	winModal.style.display = 'none'
}

function redButFunc() {
	if (0 == butSequence[playerMove]) {
		playerMove++;
		audioRed.play();
		disableBut(redBut);
		startGameAI();
	} else {
		errorClick();
	}
}

function blueButFunc() {
	if (1 == butSequence[playerMove]) {
		playerMove++;
		audioBlue.play();
		disableBut(blueBut);
		startGameAI();
	} else {
		errorClick();
	}
}

function greenButFunc() {
	if (2 == butSequence[playerMove]) {
		playerMove++;
		audioGreen.play();
		disableBut(greenBut);
		startGameAI();
	} else {
		errorClick();
	}
}

function yellowButFunc() {
	if (3 == butSequence[playerMove]) {
		playerMove++;
		audioYellow.play();
		disableBut(yellowBut);
		startGameAI();
	} else {
		errorClick();
	}
}

function disableBut(but) {
	but.disabled = true;
	setTimeout(function(){
		but.disabled = false;
	}, 600);
}
function startGameAI() {
	if (playerMove == round) {
		deactivSoundButs();
		setTimeout(gameAI, 2.5 * clickLength);
		playerMove = 0;
	}
}

function errorClick() {
	errorSound.play();
	deactivSoundButs();
	repeat = true;
	playerMove = 0;
	if (isStrict == false) {
		setTimeout(gameAI, 2 * clickLength);
	} else {
		isOn = false;
		repeat = false;
		round = 0;
		butSequence = [];
		dispText.innerHTML = "88";
		setTimeout(powerClick, clickLength);
		setTimeout(gameAI, clickLength * 3);
	}
}


function gameAI() {
	if (isOn) {
		deactivSoundButs();
		if (repeat == false) {
			round++;
			var num = Math.floor(Math.random() * 4);
			butSequence.push(num);
		}
		repeat = false;
		if (round < 21) {
			if (round > 12) {
				clickLength = 400;
			} else if (round > 8) {
				clickLength = 500;
			} else if (round > 4) {
				clickLength = 600;
			}
			if (round < 10) {
				dispText.innerHTML = '0' + round;
			} else {
				dispText.innerHTML = round;
			}
			interval = setInterval(iterate, clickLength * 1.5)
		} else {
			winModal.style.display = 'block';
			finishSound.play();
		}
	}
}

function iterate() {
	roundIter++;
	var butToClick = arrOfProp[butSequence[roundIter - 1]][0];
	butToClick.classList.add(arrOfProp[butSequence[roundIter - 1]][1]);
	arrOfProp[butSequence[roundIter - 1]][2].play();
	setTimeout(function() {
		butToClick.classList.remove(arrOfProp[butSequence[roundIter - 1]][1]);
	}, clickLength);
	if (roundIter == round) {
		clearInterval(interval);
		activSoundButs();
		setTimeout(function () {roundIter = 0;}, clickLength)
	}
}

