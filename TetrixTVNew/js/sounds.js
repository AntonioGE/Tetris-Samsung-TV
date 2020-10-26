var soundGameover;
var soundLand;
var soundLevel;
var soundLine;
var soundMove;
var soundPause;
var soundRotate;
var soundShift;
var soundTetris;


function initSounds() {
    soundGameover = new Audio('sounds/gameover.mp3');
    soundLand = new Audio('sounds/land.mp3');
    soundLevel = new Audio('sounds/level.mp3');
    soundLine = new Audio('sounds/line.mp3');
    soundMove = new Audio('sounds/move.mp3');
    soundPause = new Audio('sounds/pause.mp3');
    soundRotate = new Audio('sounds/rotate.mp3');
    soundShift = new Audio('sounds/shift.mp3');
    soundTetris = new Audio('sounds/tetris.mp3');
    //soundLevel = document.getElementById("welcome");
}