﻿var ctx;  
var canvas;
var yy = 70;
var color1 = "#ffa500";
var color2 = "#ffa500";
var color3 = "#ffa500";
var colorn = "#1e90ff";
var colors1 = "#000000";
var colors2 = "#000000";
var up    = false;
var down  = false;
var click = false;
var vy = 0;
var x;
var y;
window.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("canvas");

	canvas.width = 800;
	canvas.height = 600;

	ctx = canvas.getContext("2d");

	requestAnimationFrame(update);

	canvas.addEventListener("click", onClick);

	canvas.addEventListener("mousedown", mousedown);

	canvas.addEventListener("mouseup", mouseup);
	
	/*	window.addEventListener("keydown",function(e){

		if (e.key == "ArrowUp") {
		up = true;
		}
		if (e.key == "ArrowDown") {
		down = true;
		}
	});

	window.addEventListener("keyup",function(e){

		if (e.key == "ArrowUp") {
		up = false;
		}
		if (e.key == "ArrowDown") {
		down = false;
		}
	});

	window.addEventListener("mousedown",function(f){

		color = "#ff0000";
		colorn = "#ff0000";
	});

	window.addEventListener("mouseup",function(f){

		color = "#ffa500";
		colorn = "#1e90ff";
	});*/
	
});

function update(){
	requestAnimationFrame(update);

	/*
	if (up){
		vy = vy - 0.9;
		if (vy < -10){
			vy = -10;
		}
	}
	if (down){
		vy = vy + 0.9;
		if (vy > 10){
			vy = 10;
		}
	}
	yy = yy + vy;
	vy = vy * 0.9;
*/

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGraphics2();
	drawText2();
	drawGraphics();
	drawBottun();
	drawText();
}

function drawGraphics(){

	ctx.fillStyle = "#1e90ff";
	ctx.fillRect(45, 75, 180, 45);
	ctx.fillRect(290, 75, 180, 45);

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(520, 0, 220, 60);
	ctx.fillRect(520, 350, 220, 50);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(520, 400, 220, 200);

	ctx.lineWidth = 5;
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(40, 60, 440, 300);
	ctx.strokeRect(520, 60, 220, 290);
	ctx.strokeRect(520, 400, 220, 200);
	ctx.strokeRect(120, 200, 280, 120);

}

function drawBottun(){
	ctx.beginPath()
	ctx.fillStyle = color1;
	ctx.moveTo( 100 , 380 );
	ctx.lineTo( 50 , 410 );
	ctx.lineTo( 50 , 480 );
	ctx.lineTo( 100 , 510 );
	ctx.lineTo( 200 , 510 );
	ctx.lineTo( 250 , 480 );
	ctx.lineTo( 250 , 410 );
	ctx.lineTo( 200 , 380 );
	ctx.lineTo( 100 , 380 );
	ctx.stroke();
	ctx.fill();

	ctx.beginPath()
	ctx.fillStyle = color2;
	ctx.moveTo( 330 , 400 );
	ctx.lineTo( 280 , 430 );
	ctx.lineTo( 280 , 500 );
	ctx.lineTo( 330 , 530 );
	ctx.lineTo( 430 , 530 );
	ctx.lineTo( 480 , 500 );
	ctx.lineTo( 480 , 430 );
	ctx.lineTo( 430 , 400 );
	ctx.lineTo( 330 , 400 );
	ctx.stroke();
	ctx.fill();

	ctx.beginPath()
	ctx.fillStyle = color3;
	ctx.moveTo( 100 , 530 );
	ctx.lineTo( 60 , 560 );
	ctx.lineTo( 100 , 590 );
	ctx.lineTo( 200 , 590 );
	ctx.lineTo( 250 , 560 );
	ctx.lineTo( 200 , 530 );
	ctx.lineTo( 100 , 530 );
	ctx.stroke();
	ctx.fill();
}

function drawGraphics2(){

	ctx.fillStyle = colorn;
	ctx.fillRect(530, yy, 200, 60);
	ctx.fillRect(530, yy + 70, 200, 60);
	ctx.fillRect(530, yy + 140, 200, 60);
	ctx.fillRect(530, yy + 210, 200, 60);
}

function drawText(){
	ctx.lineWidth = 2;
	ctx.textBaseline = "top";
	ctx.font = "30px serif";
	ctx.strokeStyle = "#000000";
	ctx.strokeText("合成画面", 40, 15);
	ctx.fillStyle = "#c0c0c0";
	ctx.fillText("合成画面", 40, 15);;
	ctx.strokeText("所持リスト", 520, 15);
	ctx.fillText("所持リスト", 520, 15);
	ctx.strokeText("マイパラメータ", 520, 360);
	ctx.fillText("マイパラメータ", 520, 360);

	ctx.font = "70px serif";
	ctx.fillStyle = colors1;
	ctx.fillText("↑", 730, 60);
	ctx.fillStyle = colors2;
	ctx.fillText("↓", 730, 270);
	ctx.fillStyle = "#000000";
	ctx.fillText("+", 235, 50);
	ctx.fillText("↓", 225, 120);
	ctx.fillText("？", 225, 220)
	
	ctx.strokeStyle = "#000000";
	ctx.strokeText("合成！", 50, 400);
	ctx.fillStyle = "#c0c0c0";
	ctx.fillText("合成！", 50, 400);
	ctx.strokeText("狩り", 310, 420);
	ctx.fillStyle = "#c0c0c0";
	ctx.fillText("狩り", 310, 420);

	ctx.font = "25px serif";
	ctx.strokeText("動物（1）Lv○", 50, 80);
	ctx.fillText("動物（1）Lv○", 50, 80);
	ctx.strokeText("動物（4）Lv○", 300, 80);
	ctx.fillText("動物（4）Lv○", 300, 80);

	ctx.strokeText("合成Lv○", 530, 410);
	ctx.fillText("合成Lv○", 530, 410);
	ctx.strokeText("次のレベルまで", 530, 450);
	ctx.fillText("次のレベルまで", 530, 450);
	ctx.strokeText("あと○回", 530, 470);
	ctx.fillText("あと○回", 530, 470);
	ctx.strokeText("動物図鑑", 530, 510);
	ctx.fillText("動物図鑑", 530, 510);
	ctx.strokeText("△種類", 530, 530);
	ctx.fillText("△種類", 530, 530);

	ctx.font = "45px serif";
	ctx.strokeText("もどす", 80, 530);
	ctx.fillText("もどす", 80, 530);
	}

function drawText2(){

	ctx.font = "25px serif";
	ctx.fillStyle = "#c0c0c0";
	ctx.strokeText("動物（1）Lv○", 540, yy + 10);
	ctx.fillText("動物（1）Lv○", 540, yy + 10);
	ctx.strokeText("動物（2）Lv○", 540, yy + 80);
	ctx.fillText("動物（2）Lv○", 540, yy + 80);
	ctx.strokeText("動物（3）Lv○", 540, yy + 150);
	ctx.fillText("動物（3）Lv○", 540, yy + 150);
	ctx.strokeText("動物（4）Lv○", 540, yy + 220);
	ctx.fillText("動物（4）Lv○", 540, yy + 220);

}
function mousedown(event) {
	if (event.changedTouches) {
		var touch = event.changedTouches[0];
		x = touch.clientX - canvas.offsetLeft;
		y = touch.clientY - canvas.offsetTop;
	} else {
		x = event.offsetX == undefined
		? event.layerX
		: event.offsetX;
		y = event.offsetY == undefined
		? event.layerY
		: event.offsetY;
	}
	if (75 < x && x < 225 && 380 < y && y < 510) {
		color1 = "#ff0000";
	}
	if (305 < x && x < 455 && 400 < y && y < 530) {
		color2 = "#ff0000";
	}
	if (80 < x && x < 225 && 530 < y && y < 590) {
		color3 = "#ff0000";
	}
	if (755 < x && x < 775 && 73 < y && y < 133) {
		colors1 = "#ff0000";
	}
	if (755 < x && x < 775 && 285 < y && y < 345) {
		colors2 = "#ff0000";
	}
}

function mouseup(event) {

	if (75 < x && x < 225 && 380 < y && y < 510) {
		color1 = "#ffa500";
	}
	if (305 < x && x < 455 && 400 < y && y < 530) {
		color2 = "#ffa500";
	}
	if (80 < x && x < 225 && 530 < y && y < 590) {
		color3 = "#ffa500";
	}
	if (755 < x && x < 775 && 73 < y && y < 133) {
		colors1 = "#000000";
	}
	if (755 < x && x < 775 && 285 < y && y < 345) {
		colors2 = "#000000";
	}
}

function onClick(event) {
	
	if (75 < x && x < 225 && 380 < y && y < 510) {
		console.log("合成！");
	}
	if (305 < x && x < 455 && 400 < y && y < 530) {
		console.log("狩り！");
	}
	if (80 < x && x < 225 && 530 < y && y < 590) {
		console.log("もどす");
		ctx.clearRect(40, 60, 480, 360);
	}
	if (755 < x && x < 775 && 73 < y && y < 133) {
		yy = yy - 70;
	}
	if (755 < x && x < 775 && 285 < y && y < 345) {
		yy = yy + 70;
	}
}

