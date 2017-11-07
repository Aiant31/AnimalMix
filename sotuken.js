var ctx;  
var canvas;
var x = 200;
var y = 70;
var up    = false;
var down  = false;
var vy = 0;
var color = "#ffa500";
var colorn = "#1e90ff";
var click = false;

window.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("canvas");

	canvas.width = 800;
	canvas.height = 600;

	ctx = canvas.getContext("2d");

	requestAnimationFrame(update);

	window.addEventListener("keydown",function(e){

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
	});

	console.log(canvas);
}
);

function update(){
	requestAnimationFrame(update);

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
	y = y + vy;
	vy = vy * 0.9;

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

	ctx.fillStyle = color;
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

	ctx.fillStyle = color;
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

	ctx.fillStyle = color;
	ctx.moveTo( 100 , 530 );
	ctx.lineTo( 60 , 560 );
	ctx.lineTo( 100 , 590 );
	ctx.lineTo( 200 , 590 );
	ctx.lineTo( 250 , 560 );
	ctx.lineTo( 200 , 530 );
	ctx.lineTo( 100 , 530 );
	ctx.stroke();
}


function drawGraphics2(){

	ctx.fillStyle = colorn;
	ctx.fillRect(530, y, 200, 60);
	ctx.fillRect(530, y + 70, 200, 60);
	ctx.fillRect(530, y + 140, 200, 60);
	ctx.fillRect(530, y + 210, 200, 60);
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
	ctx.fillStyle = "#000000";
	ctx.fillText("↑", 720, 60);
	ctx.fillText("↓", 720, 270);
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
	ctx.strokeText("動物（1）Lv○", 540, y + 10);
	ctx.fillText("動物（1）Lv○", 540, y + 10);
	ctx.strokeText("動物（2）Lv○", 540, y + 80);
	ctx.fillText("動物（2）Lv○", 540, y + 80);
	ctx.strokeText("動物（3）Lv○", 540, y + 150);
	ctx.fillText("動物（3）Lv○", 540, y + 150);
	ctx.strokeText("動物（4）Lv○", 540, y + 220);
	ctx.fillText("動物（4）Lv○", 540, y + 220);

}

function drawImage(){
	var image = new Image();
	image.src = "snake.png";
	image.addEventListener("load", function(){
		//読み込み完了
		ctx.drawImage(image, 450, y, 172, 172);
		});
	}

