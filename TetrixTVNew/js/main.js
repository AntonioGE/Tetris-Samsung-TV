const display = {
    cols: 20,
    rows: 18
};

const fps = 60;
const timeout = Math.floor(1000 / fps);

const tileSize = 200;
var width, height;

var counter = 0.0;
var scale = 1.0;

var arrowRight = false;
var arrowLeft = false;
var arrowUp = false;
var arrowDown = false;
var okButton = false;

//Initialize function
var init = function() {
    // TODO:: Do your initialization job
    console.log('init() called');

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });

    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {//keydown
        switch (e.keyCode) {
            case 37: //LEFT arrow
            	arrowLeft = true;
                break;
            case 38: //UP arrow
            	arrowUp = true;
                break;
            case 39: //RIGHT arrow
            	arrowRight = true;
                break;
            case 40: //DOWN arrow
            	arrowDown = true;
                break;
            case 13: //OK button 
            	okButton = true;
                break;
            case 427:
            	level++;
            	break;
            case 428:
            	level--;
            	if(level < 0){
            		level = 0;
            	}
            	break;
            case 10009: //RETURN button
                tizen.application.getCurrentApplication().exit();
                break;
            default:
                console.log('Key code : ' + e.keyCode);
                break;
        }
    });
    

    initImageResources();
    initSounds();
    initGameState();
    
    
    loop();
};
// window.onload can work without <body onload="">
window.onload = init;



function loop() {

    tick();
    render();

    clearInput();
    
    setTimeout(loop, timeout);
}

function tick() {
	tickGameState();
	
	
}

function render() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw background
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'orange');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid(ctx);
    renderGameState(ctx);
    
}

function clearInput(){
	arrowRight = false;
	arrowLeft = false;
	arrowUp = false;
	arrowDown = false;
	okButton = false;
}

function initImageResources(){
	initTileImgArray();
}

function initGameState(){
	var canvas = document.getElementById("canvas");
	scale = canvas.height / (tileSize * grid.rows);
	width = canvas.width;
	height = canvas.height;
	
	randomPiece();
	randomPiece();
	
	initGrid();
}



