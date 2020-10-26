function drawScore(ctx) {
	
	var xOffset = 0.75 * width + 0.25 * grid.width;
	
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    
    ctx.fillText('NIVEL', xOffset, 0.15 * height);
    ctx.strokeText('NIVEL', xOffset, 0.15 * height);
    ctx.fillText(level.toString(), xOffset, 0.25 * height);
    ctx.strokeText(level.toString(), xOffset, 0.25 * height);
    
    ctx.fillText('LÍNEAS', xOffset, 0.45 * height);
    ctx.strokeText('LÍNEAS', xOffset, 0.45 * height);
    ctx.fillText(rowCounter.toString(), xOffset, 0.55 * height);
    ctx.strokeText(rowCounter.toString(), xOffset, 0.55 * height);
    
    ctx.fillText('SIGUIENTE', xOffset, 0.75 * height);
    ctx.strokeText('SIGUIENTE', xOffset, 0.75 * height);
    drawNextPiece(ctx);
}