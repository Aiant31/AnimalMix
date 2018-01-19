var ctx
var canvas

var yy = 70
var n = 0
var m = 0
var c = 4
var lv = 1

var nextlv = lv * lv
var lvCount = 0

var color1 = "#ffa500"
var color2 = "#ffa500"
var color3 = "#ffa500"
var colorn1 = "#1e90ff"
var colorn2 = "#1e90ff"
var colorn3 = "#1e90ff"
var colorn4 = "#1e90ff"
var colors1 = "#000000"
var colors2 = "#000000"

var mix = false
var clear1 = false
var clear2 = false
var clear3 = false
var clear4 = false
var up    = false
var down  = false
var click1 = false
var click2 = false
var gosei = false
var hant = false
var x
var y

const buttons = [
	{
		shape: "octagon",
		text: "合成！",
		position: [50, 380]
	},
	{
		shape: "octagon",
		text: "狩り",
		position: [280, 400]
	},
	{
		shape: "hexagon",
		text: "もどす",
		position: [60, 530]
	}
]

window.addEventListener("DOMContentLoaded", init)

function init() {
	canvas = document.getElementById("canvas")
	canvas.width = 800
	canvas.height = 600

	ctx = canvas.getContext("2d")

	canvas.addEventListener("click", onClick)
	canvas.addEventListener("mousedown", mousedown)
	canvas.addEventListener("mouseup", mouseup)

	requestAnimationFrame(update)
}

function update(){
	requestAnimationFrame(update)
	render()
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawGraphics2()
	newGraphics()
	drawText2()
	drawGraphics()
	renderButtons()
	drawText()
	drawStrokes()
}

function renderButtons() {
	let textX
	let textY
	buttons.forEach((button) => {
		const position = button.position
		switch (button.shape) {
			case "octagon":
				drawOctagonButtonFrame(position[0], position[1])
				ctx.font = "70px serif"
				ctx.lineWidth = 2
				ctx.textBaseline = "top"
				{
					const metrics = ctx.measureText(button.text)
					textX = position[0] - metrics.width / 2 + 100
					textY = position[1] + 20
				}
				break;
			case "hexagon":
				drawHexagonButtonFrame(position[0], position[1])
				ctx.font = "45px serif"
				ctx.lineWidth = 2
				ctx.textBaseline = "top"
				{
					const metrics = ctx.measureText(button.text)
					textX = position[0] - metrics.width / 2 + 95
					textY = position[1]
				}
				break;
		}
		
		ctx.strokeStyle = "black"
		ctx.fillStyle = "#c0c0c0"

		
		ctx.fillText(button.text, textX, textY)
		ctx.strokeText(button.text, textX, textY)
	})
}

function drawOctagonButtonFrame(x, y) {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.fillStyle = "#ffa500"
	ctx.beginPath()
	ctx.moveTo(x + 50, y)
	ctx.lineTo(x, y + 30)
	ctx.lineTo(x, y + 100)
	ctx.lineTo(x + 50, y + 130)
	ctx.lineTo(x + 150, y + 130)
	ctx.lineTo(x + 200, y + 100)
	ctx.lineTo(x + 200, y + 30)
	ctx.lineTo(x + 150, y)
	ctx.lineTo(x + 50, y)
	ctx.stroke()
	ctx.fill()
}

function drawHexagonButtonFrame(x, y) {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.fillStyle = "#ffa500"
	ctx.beginPath()
	ctx.moveTo(x + 40, y)
	ctx.lineTo(x, y + 30)
	ctx.lineTo(x + 40, y + 60)
	ctx.lineTo(x + 140, y + 60)
	ctx.lineTo(x + 190, y + 30)
	ctx.lineTo(x + 140, y)
	ctx.lineTo(x + 40, y)
	ctx.stroke()
	ctx.fill()
}

function drawGraphics(){

	ctx.fillStyle = "#1e90ff";
	ctx.font = "25px serif";
	if(click1 == true){
		ctx.fillRect(50, 75, 180, 45);
		ctx.fillStyle = "#c0c0c0";
		ctx.strokeText("動物（1）Lv○", 55, 80);
		ctx.fillText("動物（1）Lv○", 55, 80);
	}
	if(click2 == true){
		ctx.fillStyle = "#1e90ff";
		ctx.fillRect(290, 75, 180, 45);
		ctx.fillStyle = "#c0c0c0";
		ctx.strokeText("動物（2）Lv○", 300, 80);
		ctx.fillText("動物（2）Lv○", 300, 80);
	}
	if(mix == true){
		ctx.fillStyle = "#1e90ff";
		ctx.fillRect(120, 200, 280, 120);
	}

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(520, 0, 220, 60);
	ctx.fillRect(520, 350, 220, 50);
	ctx.fillRect(520, 400, 220, 200);

}

function drawStrokes(){

	ctx.lineWidth = 5;
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(40, 60, 440, 300);
	ctx.strokeRect(520, 60, 220, 290);
	ctx.strokeRect(520, 400, 220, 200);
	ctx.strokeRect(120, 200, 280, 120);
	ctx.lineWidth = 2;
	ctx.strokeRect(50, 75, 180, 45);
	ctx.strokeRect(290, 75, 180, 45);

}

function drawGraphics2(){

	ctx.font = "25px serif";
	ctx.fillStyle = colorn1;
	ctx.fillRect(530, yy, 200, 60);
	ctx.fillStyle = colorn2;
	ctx.fillRect(530, yy + 70, 200, 60);
	ctx.fillStyle = colorn3;
	ctx.fillRect(530, yy + 140, 200, 60);
	ctx.fillStyle = colorn4;
	ctx.fillRect(530, yy + 210, 200, 60);
	ctx.fillStyle = "#c0c0c0";
	ctx.strokeText("動物（1）Lv○", 540, yy + 10);
	ctx.fillText("動物（1）Lv○", 540, yy + 10);
	ctx.strokeText("動物（2）Lv○", 540, yy + 80);
	ctx.fillText("動物（2）Lv○", 540, yy + 80);
	ctx.strokeText("動物（3）Lv○", 540, yy + 150);
	ctx.fillText("動物（3）Lv○", 540, yy + 150);
	ctx.strokeText("動物（4）Lv○", 540, yy + 220);
	ctx.fillText("動物（4）Lv○", 540, yy + 220);
	if(clear1 == true){
		ctx.clearRect(530, yy, 200, 60);
	}
	if(clear2 == true){
		ctx.clearRect(530, yy + 70, 200, 60);
	}
	if(clear3 == true){
		ctx.clearRect(530, yy + 140, 200, 60);
	}
	if(clear4 == true){
		ctx.clearRect(530, yy + 210, 200, 60);
	}
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
	
	ctx.font = "25px serif";
	ctx.strokeText("合成Lv" + lv, 530, 410);
	ctx.fillText("合成Lv" + lv, 530, 410);
	ctx.strokeText("次のレベルまで", 530, 450);
	ctx.fillText("次のレベルまで", 530, 450);
	ctx.strokeText("あと" + nextlv + "回", 530, 470);
	ctx.fillText("あと" + nextlv + "回", 530, 470);
	ctx.strokeText("動物図鑑", 530, 510);
	ctx.fillText("動物図鑑", 530, 510);
	ctx.strokeText("△種類", 530, 530);
	ctx.fillText("△種類", 530, 530);
}

function drawText2(){

	ctx.font = "25px serif";
	ctx.fillStyle = "#c0c0c0";
	ctx.strokeText("1体目", 110, 80);
	ctx.fillText("1体目", 110, 80);
	ctx.strokeText("2体目", 350, 80);
	ctx.fillText("2体目", 350, 80);
	ctx.font = "70px serif";
	ctx.fillStyle = "#000000";
	ctx.fillText("？", 225, 220)

}

function newGraphics(){

	if(gosei == true){
		ctx.fillRect(530, yy + yy * c, 200, 60);
	}
	if(hant == true){
		ctx.fillRect(530, yy + yy * c, 200, 60);
	}
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
		if(click1 == true && click2 == true){
			console.log("成功！");
			click1 = false;
			click2 = false;
			mix = true;
			if(n == 1 || m == 1){
				clear1 = true;
				if(n == 2 || m == 2){
					clear2 = true;
				}
			}
			if(n == 3 || m == 3){
				clear3 = true;
				if(n == 4 || m == 4){
					clear4 = true;
				}
			}
			lvCount++;
			if(lvCount == lv * lv){
				lv++;
				nextlv = lv * lv;
				lvCount = 0;
			}
			else{
				nextlv--;
		}
		}
	}
	if (305 < x && x < 455 && 400 < y && y < 530) {
		console.log("狩り！");
		hant = true;
		newGraphics();
		c++;
	}
	if (80 < x && x < 225 && 530 < y && y < 590) {
		console.log("もどす");
		click1 = false;
		click2 = false;
		colorn1 = "#1e90ff";
		colorn2 = "#1e90ff";
		colorn3 = "#1e90ff";
		colorn4 = "#1e90ff";
	}
	if (530 < x && x < 730 && yy < y && y < yy + 60) {
		if(click1 == false && mix == false){
			colorn1 = "#ff0000";
			click1 = true;
			n = 1;
		}
		else{
			colorn1 = "#1e90ff";
			click1 = false;
			n = 0;
		}
	}
	if (530 < x && x < 730 && yy + 70 < y && y < yy + 130) {
		if(click2 == false && mix == false){
			colorn2 = "#ff0000";
			click2 = true;
			m = 2;
		}
		else{
			colorn2 = "#1e90ff";
			click2 = false;
			m = 0;
		}
	}
	if (530 < x && x < 730 && yy + 140 < y && y < yy + 200) {
		if(click1 == false && mix == false){
			colorn3 = "#ff0000";
			click1 = true;
			n = 3;
		}
		else{
			colorn3 = "#1e90ff";
			click1 = false;
			n = 0;
		}
	}
	if (530 < x && x < 730 && yy + 210 < y && y < yy + 270) {
		if(click2 == false && mix == false){
			colorn4 = "#ff0000";
			click2 = true;
			m = 4;
		}
		else{
			colorn4 = "#1e90ff";
			click2 = false;
			m = 0;
		}
	}
	if (755 < x && x < 775 && 73 < y && y < 133) {
		yy = yy - 70;
	}
	if (755 < x && x < 775 && 285 < y && y < 345) {
		yy = yy + 70;
	}
	if(120 < x && x < 400 && 200 < y && y < 320){
		mix = false;
		gosei = true;
		newGraphics();
		c++;
	}
}

