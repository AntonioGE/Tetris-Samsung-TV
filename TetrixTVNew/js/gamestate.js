const PLAY_STATE_MOVE_PIECE = 0;
const PLAY_STATE_PLACE_PIECE = 1;
const PLAY_STATE_CLEAR_ROWS = 2;
const PLAY_STATE_FILL_SCREEN = 3;
const PLAY_STATE_GAME_OVER = 4;
var playState = PLAY_STATE_MOVE_PIECE;


var fullRows = [];

const placePieceFrameDelay = 30;
var placePieceCounter = 0;

const rowsPerLevel = 10;
var level = 0;
var rowCounter = 0;

const pieceFrameDelays = [53, 49, 45, 41, 37, 33, 28, 22, 17, 11, 10, 9, 8, 7, 6, 6, 5, 5, 4, 4, 3];
const fastPieceFrameDelay = 3;
var pieceFrameDelay = pieceFrameDelays[level];
var pieceFrameCounter = 0;
var nextPieceType = 0;

var fillScreenRow = grid.rows - 1;
var clearScreenRow = grid.rows - 1;
var fillScreenCounter = 0;
const fillScreenDelay = 2;

var removeAnim = {
        numFlashes: 4,
        flashCounter: 0,
        flashFrameDelay: 15,
        flashFrameCounter: 0,
        drawFlash: true
    }
    //Num flashes = 4

function tickGameState() {

    switch (playState) {
        case PLAY_STATE_MOVE_PIECE:
            if (okButton) {
                if (canRotatePiece()) {
                    piece.frame = (piece.frame + 1) % pieces[piece.type].length;
                    soundRotate.pause();
                    soundRotate.currentTime = 0;
                    soundRotate.play();
                }
            } else if (arrowLeft) {
                if (!currentPieceCollides(-1, 0)) {
                    piece.x--;
                    soundMove.pause();
                    soundMove.currentTime = 0;
                    soundMove.play();
                }
            } else if (arrowRight) {
                if (!currentPieceCollides(1, 0)) {
                    piece.x++;
                    soundMove.pause();
                    soundMove.currentTime = 0;
                    soundMove.play();
                }
            } else if (arrowDown) {
                pieceFrameDelay = fastPieceFrameDelay;
                placePieceCounter = placePieceFrameDelay;
            }

            pieceFrameCounter++;
            if (pieceFrameCounter > pieceFrameDelay / 2) {//NEW CODE
                pieceFrameCounter = 0;
                if (currentPieceCollides(0, 1)) {
                    playState = PLAY_STATE_MOVE_PIECE;

                    writePiece();

                    fullRows = getFullRowsIndices();
                    if (fullRows.length > 0) {
                        playState = PLAY_STATE_CLEAR_ROWS;
                        soundLine.play();
                    } else {
                        soundLand.play();

                        if (piece.y == 0) {
                            playState = PLAY_STATE_FILL_SCREEN;
                        }
                    }

                    pieceFrameDelay = pieceFrameDelays[level % pieceFrameDelays.length];

                    randomPiece();

                } else {
                    piece.y++;
                    //soundMove.pause();
                    //soundMove.currentTime = 0;
                    soundMove.play();
                }
            }

            break;
        case PLAY_STATE_CLEAR_ROWS:
            if (removeAnim.flashCounter < removeAnim.numFlashes) {
                removeAnim.flashFrameCounter++;
                if (removeAnim.flashFrameCounter > removeAnim.flashFrameDelay) {
                    removeAnim.drawFlash = !removeAnim.drawFlash;

                    removeAnim.flashFrameCounter = 0;
                    if (!removeAnim.drawFlash) {
                        removeAnim.flashCounter++;
                    }
                }
            } else {
                playState = PLAY_STATE_MOVE_PIECE;

                removeRows(fullRows);

                soundLand.play();

                var rowsBefore = rowCounter;
                rowCounter += fullRows.length;
                if (Math.floor(rowCounter / rowsPerLevel) != Math.floor(rowsBefore / rowsPerLevel)) {
                    level++;
                    pieceFrameDelay = pieceFrameDelays[level % pieceFrameDelays.length];

                    soundLand.pause();
                    soundLand.currentTime = 0;
                    soundLevel.play();
                }

                removeAnim.flashCounter = 0;
                removeAnim.flashFrameCounter = 0;
                removeAnim.drawFlash = true;
            }
            break;
        case PLAY_STATE_FILL_SCREEN:
            if (fillScreenCounter > fillScreenDelay) {
                if (fillScreenRow >= 0) {
                    setRow(fillScreenRow, BLOCK_BLACK);
                    fillScreenRow--;
                } else if (clearScreenRow >= 0) {
                    setRow(clearScreenRow, EMPTY);
                    clearScreenRow--;
                } else {
                    playState = PLAY_STATE_GAME_OVER;
                    soundGameover.play();
                }
                fillScreenCounter = 0;
            }
            fillScreenCounter++;
            break;
        case PLAY_STATE_GAME_OVER:
            if (okButton) {
                playState = PLAY_STATE_MOVE_PIECE;
                initGame();
            }
            break;
    }
}

function renderGameState(ctx) {
    drawScore(ctx);
    switch (playState) {
        case PLAY_STATE_MOVE_PIECE:
            drawPiece(ctx);
            break;
        case PLAY_STATE_CLEAR_ROWS:
            if (removeAnim.drawFlash) {
                drawFlash(ctx);
            }
            break;
        case PLAY_STATE_GAME_OVER:
            var xOffset = width / 2;

            ctx.font = "bold 100px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.fillText('GAME OVER', xOffset, 0.45 * height);
            ctx.strokeText('GAME OVER', xOffset, 0.45 * height);

            ctx.font = "bold 80px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.fillText('Pulsa OK para volver a jugar', xOffset, 0.55 * height);
            ctx.strokeText('Pulsa OK para volver a jugar', xOffset, 0.55 * height);
            break;
    }
}

function initGame() {
    placePieceCounter = 0;

    level = 0;
    rowCounter = 0;

    pieceFrameDelay = pieceFrameDelays[level];
    pieceFrameCounter = 0;

    fillScreenRow = grid.rows - 1;
    clearScreenRow = grid.rows - 1;

    fillScreenCounter = 0;

    randomPiece();
    randomPiece();

    initGrid();

}