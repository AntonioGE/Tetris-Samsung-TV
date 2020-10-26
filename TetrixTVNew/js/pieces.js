//[]
const PIECE_0 = [
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ]
];

const PIECE_1 = [
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]
];

const PIECE_2 = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ]
];

const PIECE_3 = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ]
];

const PIECE_4 = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
];

const PIECE_5 = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
];

const PIECE_6 = [
    [
        [1, 1],
        [1, 1]
    ]
];

const pieces = [
    PIECE_0,
    PIECE_1,
    PIECE_2,
    PIECE_3,
    PIECE_4,
    PIECE_5,
    PIECE_6
];

var piece = {
    x: 0,
    y: 0,
    frame: 0,
    type: 3
};


function drawPiece(ctx) {
    var xOffset = (width - grid.width) / 2;
    var yOffset = (height - grid.height) / 2;

    for (var i = 0; i < pieces[piece.type][piece.frame].length; i++) {
        for (var j = 0; j < pieces[piece.type][piece.frame][i].length; j++) {
            var value = pieces[piece.type][piece.frame][i][j];
            if (value == 1) {
                ctx.drawImage(tiles[piece.type + 1], (piece.x + i) * tileSize * scale + xOffset, (piece.y + j) * tileSize * scale + yOffset,
                    tileSize * scale,
                    tileSize * scale);
            }
        }
    }
}


function drawNextPiece(ctx){
	var xOffset = 0.75 * width + 0.25 * grid.width - 2 *  tileSize * scale;
	var yOffset = 0.75 * height + 1 *  tileSize * scale;
	for (var i = 0; i < pieces[nextPieceType][0].length; i++) {
        for (var j = 0; j < pieces[nextPieceType][0][i].length; j++) {
            var value = pieces[nextPieceType][0][i][j];
            if (value == 1) {
                ctx.drawImage(tiles[nextPieceType + 1], i * tileSize * scale + xOffset, j * tileSize * scale + yOffset,
                    tileSize * scale,
                    tileSize * scale);
            }
        }
    }
}


function pieceCollides(piece, dx, dy) {
    for (var i = 0; i < pieces[piece.type][piece.frame].length; i++) {
        for (var j = 0; j < pieces[piece.type][piece.frame][i].length; j++) {
            var value = pieces[piece.type][piece.frame][i][j];
            if (value == 1) {
                if (isSolid(piece.x + i + dx, piece.y + j + dy)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function currentPieceCollides(dx, dy) {
    return pieceCollides(piece, dx, dy);
}

function writePiece() {
    for (var i = 0; i < pieces[piece.type][piece.frame].length; i++) {
        for (var j = 0; j < pieces[piece.type][piece.frame][i].length; j++) {
            var value = pieces[piece.type][piece.frame][i][j];
            if (value == 1) {
                grid.values[Math.floor(piece.x) + i][Math.floor(piece.y) + j] = piece.type + 1;
            }
        }
    }
}

function canRotatePiece() {
    var rotatedPiece = {
        x: piece.x,
        y: piece.y,
        frame: piece.frame,
        type: piece.type
    }
    rotatedPiece.frame = (rotatedPiece.frame + 1) % pieces[rotatedPiece.type].length;
    return !pieceCollides(rotatedPiece, 0, 0);
}

function randomPiece() {
    piece.x = Math.floor(grid.cols / 2) - 1;
    piece.y = 0;
    piece.type = nextPieceType;
    piece.frame = 0;

    nextPieceType = Math.floor(Math.random() * pieces.length);
}