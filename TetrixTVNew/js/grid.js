
const grid = {
    cols: 10,
    rows: 18,
    width: 0,
    height: 0,
    values: []
};

function initGrid(){
	grid.width = grid.cols * tileSize * scale;
	grid.height = grid.rows * tileSize * scale;
	grid.values = [];
	for(var i = 0; i < grid.cols; i++){
		grid.values[i] = [];
		for(var j = 0; j < grid.rows; j++){
			grid.values[i][j] = EMPTY;
		}
	}
}


function drawGrid(ctx){

	var xOffset = (width - grid.width) / 2;
	var yOffset = (height - grid.height) / 2;
	
	
	for(var i = 0; i < grid.cols; i++){
		for(var j = 0; j < grid.rows; j++){
			var value = grid.values[i][j];
			//if(value != EMPTY){
				ctx.drawImage(tiles[value], 
						i * tileSize * scale + xOffset, 
						j * tileSize * scale + yOffset,
						tileSize * scale,
						tileSize * scale);
			//}
		}
	}
}

function drawFlash(ctx){
	var xOffset = (width - grid.width) / 2;
	var yOffset = (height - grid.height) / 2;
	
	for(var j = 0; j < fullRows.length; j++){
		for(var i = 0; i < grid.cols; i++){
			ctx.drawImage(tiles[BLOCK_FLASH], 
					i * tileSize * scale + xOffset, 
					fullRows[j] * tileSize * scale + yOffset,
					tileSize * scale,
					tileSize * scale);
		}
	}
}

function isSolid(col, row){
	if(col >= 0 && col < grid.cols && row >= 0 && row < grid.rows){
		if(grid.values[Math.floor(col)][Math.floor(row)] == EMPTY){
			return false;
		}
	}
	return true;
}

function isRowFull(row){
	for(var i = 0; i < grid.cols; i++){
		if(grid.values[i][row] == EMPTY){
			return false;
		}
	}
	return true;
}

function getFullRowsIndices(){
	var fullRowIndices = [];
	for(var j = 0; j < grid.rows; j++){
		if(isRowFull(j)){
			fullRowIndices.push(j);
		}
	}
	return fullRowIndices;
}

function setRow(row, value){
	for(var i = 0; i < grid.cols; i++){
		grid.values[i][row] = value;
	}
}

function clearRow(row){
	setRow(row, EMPTY);
}

function removeRow(row){
	for(var j = row - 1; j >= 0; j--){
		moveRow(j, j + 1);
	}
	clearRow(0);
}

function moveRow(from, to){
	for(var i = 0; i < grid.cols; i++){
		grid.values[i][to] = grid.values[i][from];
	}
}

function removeRows(rows){
	for(var j = 0; j < rows.length; j++){
		removeRow(rows[j]);
	}
}
