const EMPTY = 0;

const BLOCK_FLASH = 8;
const BLOCK_BLACK = 9;

var tiles;

function initTileImgArray() {
	tiles = new Array(10);
	tiles[EMPTY] = document.getElementById("empty");
	tiles[1] = document.getElementById("block_dark_blue");
	tiles[2] = document.getElementById("block_green");
	tiles[3] = document.getElementById("block_light_blue");
	tiles[4] = document.getElementById("block_magenta");
	tiles[5] = document.getElementById("block_purple");
	tiles[6] = document.getElementById("block_red");
	tiles[7] = document.getElementById("block_yellow");
	tiles[BLOCK_FLASH] = document.getElementById("block_flash");
	tiles[BLOCK_BLACK] = document.getElementById("block_black");
}
