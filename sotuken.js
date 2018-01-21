var ctx
var canvas

var level = 1
var nextLevelMixCountdown = level * level

var mixed = false

/**
 * ボタンデータ
 */
const buttons = [
	{
		shape: "octagon",
		text: "合成！",
		position: {
			x: 50,
			y: 380
		},
		state: null,
		visible: true,
		onclick: executeMix
	},
	{
		shape: "octagon",
		text: "狩り",
		position: {
			x: 280,
			y: 400
		},
		staet: null,
		visible: true,
		onclick: executeHant
	},
	{
		shape: "hexagon",
		text: "もどす",
		position: {
			x: 60,
			y: 530
		},
		state: null,
		visible: true,
		onclick: executeBack
	},
	{
		shape: "text",
		text: "↑",
		position: {
			x: 730,
			y: 60
		},
		state: null,
		visible: true,
		onclick: scrollUp
	},
	{
		shape: "text",
		text: "↓",
		position: {
			x: 730,
			y: 270
		},
		state: null,
		visible: true,
		onclick: scrollDown
	}
]


/**
 * キャラクターのマスターデータ
 */
const characterMaster = [
	{
		name: "動物１",
		level: 1
	},
	{
		name: "動物２",
		level: 2
	},
	{
		name: "動物３",
		level: 3
	},
	{
		name: "動物４",
		level: 4
	}
]


/**
 * 所有しているキャラクター
 */
let propertyCharacter = [0, 0, 1, 2, 3, 0]

/**
 * 所有キャラクターリストのスクロール位置
 */
var propertyListScroll = 0

/**
 * 選択中の所有キャラクター項番（２つ）
 */
var selectedPropertyCharacter = []


window.addEventListener("DOMContentLoaded", init)

/**
 * 初期化
 */
function init() {
	canvas = document.getElementById("canvas")
	canvas.width = 800
	canvas.height = 600

	ctx = canvas.getContext("2d")

	canvas.addEventListener("click", mouseevent)
	canvas.addEventListener("mousedown", mouseevent)
	canvas.addEventListener("mouseup", mouseup)

	buttons[3].visible = false
	if (propertyCharacter.length <= 4) {
		buttons[4].visible = false
	}

	requestAnimationFrame(update)
}


/**
 * 更新
 */
function update() {
	requestAnimationFrame(update)
	render()
}


/**
 * 描画
 */
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// 合成画面の描画
	renderMixView()

	// ボタンの描画
	renderButtons()

	// 所持キャラクターリストの描画
	renderProperties()

	// ステータス画面の描画
	renderStatusView()
}


/**
 * ボタンの描画
 */
function renderButtons() {
	let textX
	let textY
	buttons.forEach((button) => {
		if (button.visible == false) {
			return;
		}
		if (button.state == null) {
			button.state = "normal"
		}
		const position = button.position
		switch (button.shape) {
			case "octagon":
				drawOctagonButtonFrame(position.x, position.y, button.state)
				ctx.font = "70px serif"
				ctx.lineWidth = 2
				ctx.textBaseline = "top"
				{
					const metrics = ctx.measureText(button.text)
					textX = position.x - metrics.width / 2 + 100
					textY = position.y + 20
				}
				break;
			case "hexagon":
				drawHexagonButtonFrame(position.x, position.y, button.state)
				ctx.font = "45px serif"
				ctx.lineWidth = 2
				ctx.textBaseline = "top"
				{
					const metrics = ctx.measureText(button.text)
					textX = position.x - metrics.width / 2 + 95
					textY = position.y
				}
				break;
		}
		
		switch (button.shape) {
			case "octagon":
			case "hexagon":
				ctx.strokeStyle = "black"
				ctx.fillStyle = "#c0c0c0"
		
				ctx.fillText(button.text, textX, textY)
				ctx.strokeText(button.text, textX, textY)
				break
			case "text":
				ctx.font = "70px serif"
				if (button.state == "press") {
					ctx.fillStyle = "red"
				} else if (button.state = "normal") {
					ctx.fillStyle = "black"
				}
				ctx.fillText(button.text, position.x, position.y)
				break
		}
		
	})
}


/**
 * 八角形タイプのボタン枠の描画
 * @param {Number} x 
 * @param {Number} y 
 */
function drawOctagonButtonFrame(x, y, state) {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	switch (state) {
		case "press":
			ctx.fillStyle = "#ff0000"
			break
		case "normal":
		default:
			ctx.fillStyle = "#ffa500"
			break
	}
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


/**
 * 六角形タイプのボタン枠の描画
 * @param {Number} x 
 * @param {Number} y 
 */
function drawHexagonButtonFrame(x, y, state) {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	switch (state) {
		case "press":
			ctx.fillStyle = "#ff0000"
			break
		case "normal":
		default:
			ctx.fillStyle = "#ffa500"
			break
	}
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


/**
 * 所有キャラクターリストの描画
 */
function renderProperties() {
	ctx.lineWidth = 2
	ctx.textBaseline = "top"
	ctx.font = "30px serif"
	ctx.strokeStyle = "black"
	ctx.fillStyle = "#c0c0c0"
	ctx.strokeText("所持リスト", 520, 15)
	ctx.fillText("所持リスト", 520, 15)

	// 枠
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.strokeRect(520, 60, 220, 290)

	// 所有キャラクター
	ctx.font = "25px serif";
	[0, 1, 2, 3].forEach((index) => {
		const propertyCharacterIndex = propertyListScroll + index
		if (propertyCharacter.length <= propertyCharacterIndex) {
			return
		}
		const charaId = propertyCharacter[propertyCharacterIndex]
		const chara = characterMaster[charaId]

		// 項目の枠
		if (selectedPropertyCharacter.includes(propertyCharacterIndex)) {
			// 選択中のキャラクター
			ctx.fillStyle = "red"
		} else {
			ctx.fillStyle = "#1e90ff"
		}
		ctx.fillRect(530, 70 + 70 * index, 200, 60)

		// キャラクター名
		ctx.fillStyle = "#c0c0c0"
		ctx.strokeStyle = "black"
		const displayName = chara.name + " Lv" + chara.level
		ctx.strokeText(displayName, 540, 80 + 70 * index)
		ctx.fillText(displayName, 540, 80 + 70 * index)
	})
}


/**
 * 合成画面の描画
 */
function renderMixView() {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.strokeRect(40, 60, 440, 300)
	ctx.strokeRect(120, 200, 280, 120);

	ctx.lineWidth = 2;
	ctx.strokeRect(50, 75, 180, 45);
	ctx.strokeRect(290, 75, 180, 45);

	ctx.textBaseline = "top"
	ctx.font = "30px serif"
	ctx.fillStyle = "#c0c0c0"
	ctx.strokeText("合成画面", 40, 15)
	ctx.fillText("合成画面", 40, 15)

	ctx.font = "70px serif"
	ctx.fillStyle = "black"
	ctx.fillText("+", 235, 50)
	ctx.fillText("↓", 225, 120)

	ctx.font = "25px serif"
	ctx.fillStyle = "#c0c0c0"
	ctx.strokeText("1体目", 110, 80)
	ctx.fillText("1体目", 110, 80)
	ctx.strokeText("2体目", 350, 80)
	ctx.fillText("2体目", 350, 80)
	ctx.font = "70px serif"
	ctx.fillStyle = "black"
	ctx.fillText("？", 225, 220)

	// 合成対象のキャラクター
	selectedPropertyCharacter.forEach((propertyIndex, index) => {
		const charaId = propertyCharacter[propertyIndex]
		const chara = characterMaster[charaId]
		ctx.fillStyle = "#1e90ff"
		ctx.font = "25px serif"
		ctx.fillRect(50 + 240 * index, 75, 180, 45);
		const displayName = chara.name + " Lv" + chara.level
		ctx.strokeText(displayName, 55 + 245 * index, 80);
		ctx.fillStyle = "#c0c0c0";
		ctx.fillText(displayName, 55 + 245 * index, 80);
	})

	// 合成済みキャラクター
	if (mixed) {
		ctx.fillStyle = "#1e90ff"
		ctx.font = "25px serif"
		ctx.fillRect(120, 200, 280, 120);
	}
}


/**
 * ステータス画面の描画
 */
function renderStatusView() {
	ctx.lineWidth = 5
	ctx.strokeStyle = "black"
	ctx.strokeRect(520, 400, 220, 200)

	ctx.lineWidth = 2
	ctx.textBaseline = "top"
	ctx.font = "30px serif"
	ctx.strokeStyle = "black"
	ctx.fillStyle = "#c0c0c0"
	ctx.strokeText("マイパラメータ", 520, 360)
	ctx.fillText("マイパラメータ", 520, 360)

	ctx.fillStyle = "black"
	ctx.font = "25px serif"
	ctx.strokeText("合成Lv" + level, 530, 410)
	ctx.fillText("合成Lv" + level, 530, 410)
	ctx.strokeText("次のレベルまで", 530, 450)
	ctx.fillText("次のレベルまで", 530, 450)
	ctx.strokeText("あと" + nextLevelMixCountdown + "回", 530, 470)
	ctx.fillText("あと" + nextLevelMixCountdown + "回", 530, 470)
	ctx.strokeText("動物図鑑", 530, 510)
	ctx.fillText("動物図鑑", 530, 510)
	ctx.strokeText("△種類", 530, 530)
	ctx.fillText("△種類", 530, 530)
}


/**
 * マウス入力時の処理
 * @param {Event} event 
 */
function mouseevent(event) {
	let x
	let y
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

	buttons.forEach((button) => {
		const position = button.position
		let width;
		let height;
		switch (button.shape) {
			case "octagon":
				width = 150
				height = 130
				break
			case "hexagon":
				width = 145
				height = 60
				break
			case "text":
				width = 20
				height = 60
				break
		}

		const left = position.x + 25
		const right = position.x + 25 + width
		const top = position.y
		const bottom = position.y + height
		if (left < x && x < right && top < y && y < bottom) {
			if (event.type == "mousedown") {
				button.state = "press"
			} else if (event.type == "click") {
				if (button.onclick != null && button.visible) {
					button.onclick()
				}
			}
		}
	})

	// 合成対象キャラクターの追加
	if (mixed == false && event.type == "click") {
		[0, 1, 2, 3].forEach((index) => {
			const top = 70 + 70 * index
			if (530 < x && x < 730 && top < y && y < top + 60) {
				const propertyCharacterIndex = propertyListScroll + index
				if (propertyCharacter.length <= propertyCharacterIndex) {
					return
				}
				const existsIndex = selectedPropertyCharacter.indexOf(propertyCharacterIndex)
				if (existsIndex == -1) {
					if (selectedPropertyCharacter.length < 2) {
						selectedPropertyCharacter.push(propertyCharacterIndex)
					}
				} else {
					selectedPropertyCharacter.splice(existsIndex, 1)
				}
			}
		})
	}

	// 合成済みキャラクターの獲得
	if(120 < x && x < 400 && 200 < y && y < 320){
		mixed = false;
	}
}


/**
 * マウスクリックを上げたときの処理
 * @param {Event} event 
 */
function mouseup(event) {
	buttons.forEach((button) => {
		button.state = "normal"
	})
}


/**
 * 合成実行
 */
function executeMix() {
	if (mixed || selectedPropertyCharacter.length != 2) {
		return
	}

	// 合成対象のキャラクターを所持キャラクターから削除
	console.dir(selectedPropertyCharacter)
	propertyCharacter = propertyCharacter.filter((_, index) => {
		console.log(index, selectedPropertyCharacter.includes(index))
		return selectedPropertyCharacter.includes(index) == false
	})
	updateScroll()

	selectedPropertyCharacter.length = 0
	mixed = true;

	nextLevelMixCountdown--;
	if(nextLevelMixCountdown == 0){
		level++;
		nextLevelMixCountdown = level * level;
	}
}


/**
 * 狩り実行
 */
function executeHant() {
	console.log("狩り")
}


/**
 * もどす
 */
function executeBack() {
	selectedPropertyCharacter.length = 0
}


/**
 * 所持キャラクターリストの上スクロール
 */
function scrollUp() {
	if (propertyListScroll != 0) {
		propertyListScroll--;
		updateScroll()
	}
}


/**
 * 所持キャラクターリストの下スクロール
 */
function scrollDown() {
	if (propertyListScroll <= propertyCharacter.length - 4) {
		propertyListScroll++;
		updateScroll()
	}
}


/**
 * スクロール状態／スクロールボタンの更新
 */
function updateScroll() {
	if (propertyListScroll > propertyCharacter.length - 4) {
		propertyListScroll = propertyCharacter.length - 4
	}
	if (propertyCharacter.length <= 4) {
		propertyListScroll = 0
		buttons[3].visible = false
		buttons[4].visible = false
	} else {
		buttons[3].visible = true
		buttons[4].visible = true
		if (propertyListScroll == 0) {
			buttons[3].visible = false
		}
		if (propertyListScroll == propertyCharacter.length - 4) {
			buttons[4].visible = false
		}
	}
}