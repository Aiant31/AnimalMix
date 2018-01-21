var ctx
var canvas

var level = 1
var nextLevelMixCountdown = level * level

var mixedCharacter = null

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
		name: "ネズミ",
		level: 1
	},
	{
		name: "ネコ",
		level: 4
	},
	{
		name: "イヌ",
		level: 10
	},
	{
		name: "ライオン",
		level: 30
	},
	{
		name: "キリン",
		level: 15
	},
	{
		name: "カバ",
		level: 20
	},
	{
		name: "カピバラ",
		level: 5
	},
	{
		name: "アルパカ",
		level: 6
	},
	{
		name: "アヒル",
		level: 2
	},
	{
		name: "カンガルー",
		level: 5
	},
	{
		name: "カメ",
		level: 13
	},
	{
		name: "トカゲ",
		level: 8
	},
	{
		name: "ハムスター",
		level: 1
	},
	{
		name: "ウサギ",
		level: 3
	},
	{
		name: "ウマ",
		level: 12
	},
	{
		name: "ヒツジ",
		level: 10
	},
	{
		name: "ヤギ",
		level: 9
	},
	{
		name: "クマ",
		level: 28
	},
	{
		name: "パンダ",
		level: 22
	},
	{
		name: "ゾウ",
		level: 30
	},
	{
		name: "ハイエナ",
		level: 26
	},
	{
		name: "シカ",
		level: 16
	},
	{
		name: "ニワトリ",
		level: 4
	},
	{
		name: "トラ",
		level: 29
	},
	{
		name: "カエル",
		level: 2
	}
]


/**
 * 初期キャラクター
 */
const startCharacter = [0, 1]


/**
 * 所有しているキャラクター
 */
let propertyCharacter = []

/**
 * 所有キャラクターリストのスクロール位置
 */
let propertyListScroll = 0

/**
 * 選択中の所有キャラクター項番（２つ）
 */
let selectedPropertyCharacter = []


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

	// 初期キャラクター
	startCharacter.forEach((charaId) => {
		const chara = characterMaster[charaId]
		propertyCharacter.push({
			charaId: charaId,
			level: chara.level
		})
	})

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
		const property = propertyCharacter[propertyCharacterIndex]
		const charaId = property.charaId
		const level = property.level
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
		const displayName = chara.name + " Lv" + level
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
		const property = propertyCharacter[propertyIndex]
		const charaId = property.charaId
		const level = property.level
		const chara = characterMaster[charaId]
		ctx.fillStyle = "#1e90ff"
		ctx.font = "25px serif"
		ctx.fillRect(50 + 240 * index, 75, 180, 45);
		const displayName = chara.name + " Lv" + level
		ctx.strokeText(displayName, 55 + 245 * index, 80);
		ctx.fillStyle = "#c0c0c0";
		ctx.fillText(displayName, 55 + 245 * index, 80);
	})

	// 合成済みキャラクター
	if (mixedCharacter) {
		const chara = characterMaster[mixedCharacter.charaId]
		const level = mixedCharacter.level
		ctx.fillStyle = "#1e90ff"
		ctx.font = "25px serif"
		ctx.fillRect(120, 200, 280, 120);
		const displayName = chara.name + " Lv" + level
		ctx.strokeText(displayName, 125, 205);
		ctx.fillStyle = "#c0c0c0";
		ctx.fillText(displayName, 125, 205);
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
	if (mixedCharacter == null && event.type == "click") {
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
	if(120 < x && x < 400 && 200 < y && y < 320 && event.type == "click"){
		if (mixedCharacter) {
			propertyCharacter.push(mixedCharacter)
			mixedCharacter = null
		}
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
	if (mixedCharacter || selectedPropertyCharacter.length != 2) {
		return
	}

	// キャラクターを合成する
	const property1 = propertyCharacter[selectedPropertyCharacter[0]]
	const property2 = propertyCharacter[selectedPropertyCharacter[1]]
	mixedCharacter = calcMix(property1, property2)

	// 合成対象のキャラクターを所持キャラクターから削除
	propertyCharacter = propertyCharacter.filter((_, index) => {
		return selectedPropertyCharacter.includes(index) == false
	})
	updateScroll()

	selectedPropertyCharacter.length = 0

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
	selectedPropertyCharacter.length = 0
	propertyCharacter.forEach(property => hanting(property))
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


/**
 * キャラクター合成結果の計算
 * @param {Object} property1 所有キャラ１ 
 * @param {Object} property2 所有キャラ２ 
 * @return {Object} 合成結果のキャラクター情報
 */
function calcMix(property1, property2) {
	// 強いキャラと弱いキャラを判定
	let strongChara
	let weakChara
	if (property1.level > property2.level) {
		strongChara = property1
		weakChara = property2
	} else if (property1.level < property2.level) {
		strongChara = property2
		weakChara = property1
	} else {
		// レベルが同じ場合は、どちらかランダム
		if (Math.floor(Math.random() * 2) == 0) {
			strongChara = property1
			weakChara = property2
		} else {
			strongChara = property2
			weakChara = property1
		}
	}

	// 強いキャラが弱いキャラを食う
	strongChara.level += weakChara.level

	// 強いキャラをそのまま合成結果とする
	return strongChara
}


/**
 * 狩りの実行
 * @param {Object} property 狩りに行かせるキャラクター
 * @return {Object|String|null} 捕まえた獲物（狩りに行ったキャラが死んだら"death"）
 */
function hanting(property) {
	// 野生のキャラクターに遭遇
	const encountCharaId = encountCharacter()
	const encountChara = characterMaster[encountCharaId]	

	// 遭遇したキャラクターと勝負
	const totalLevel = encountChara.level + property.level * 2
	const result = Math.floor(Math.random() * totalLevel)
	if (0 <= result && result < property.level * 2) {
		// 勝利　野生のキャラクターを捕獲する
		propertyCharacter.push({
			charaId: encountCharaId,
			level: encountChara.level
		})
	} else {
		// 敗北　狩りに行ったキャラクターが死ぬ
		propertyCharacter.splice(propertyCharacter.indexOf(property), 1)
	}
	updateScroll()
}


/**
 * 野生のキャラクターに遭遇
 * @return {Number} 遭遇したキャラクターのID
 * 
 * レベルの高いキャラクターほど遭遇しにくい
 */
function encountCharacter() {
	// キャラクター基礎データの最大レベル
	const maxLevel = characterMaster
	.map(chara => chara.level)
	.reduce((prevLevel, level) => {
		return Math.max(prevLevel, level)
	})

	// キャラクターごとの遭遇率
	const encountCharacters = characterMaster.map((chara, index)  => {
		return {
			charaId: index,
			rate: maxLevel + 1 - chara.level
		}
	})
	.reduce((list, chara) => {
		if (chara.charaId == 0) {
			chara.prevRatePosition = 0
		} else {
			const prevChara = list[chara.charaId - 1]
			chara.prevRatePosition = prevChara.prevRatePosition + prevChara.rate
		}
		return list.concat(chara)
	}, [])

	const totalRates = encountCharacters
	.map(chara => chara.rate)
	.reduce((prevRate, rate) => {
		return prevRate + rate
	})

	// キャラクターに遭遇
	const encountNumber = Math.floor(Math.random() * totalRates)
	const encountCharaId = encountCharacters.find(chara => {
		if (chara.prevRatePosition <= encountNumber && encountNumber < chara.prevRatePosition + chara.rate) {
			return true
		}
		return false
	}).charaId

	return encountCharaId
}