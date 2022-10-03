/** ### IMPORTS ###*/
import Swal from "sweetalert2";

/** ### VARIABLES ### */
const $container = document.getElementById("app") as HTMLDivElement;
const $turn = document.getElementById("turn") as HTMLParagraphElement;

let player1Move = "X",
	player2Move = "O";
let player1 = 1,
	player2 = 2;
let nextTurn = player1;

//Imprimir el turno del jugador correspondiente
$turn.innerHTML = "<b style='font-family: Kalam, cursive;'>Turno del jugador 1</b>";

//Evento para resetear el juego
document.getElementById("reset")!.addEventListener("click", () => {
	location.reload();
});

/** ### TYPES ### */
type Tie = {
	botones: Array<HTMLButtonElement>;
	boton: HTMLCollectionOf<HTMLButtonElement>;
	jugador1: string;
	jugador2: string;
};
type Message = {
	boton: HTMLCollectionOf<HTMLButtonElement>;
	btn1: HTMLButtonElement;
	btn2: HTMLButtonElement;
	btn3: HTMLButtonElement;
	jugador: number;
};
type Winner = {
	botones: Array<HTMLButtonElement>;
	boton: HTMLCollectionOf<HTMLButtonElement>;
	playerMove: string;
	playerTurn: number;
};

type Movement = {
	button: HTMLButtonElement;
	move: string;
	color: string;
	turn: number;
};

/** ### FUNCIONES ### */
const checkNextMove = (data: Movement) => {
	const { button, move, color, turn } = data;
	button.disabled = true;
	button.textContent = move;
	button.style.background = "#16213E";
	button.style.color = color;
	button.style.cursor = "default";
	button.style.border = "2px solid #444";
	$turn.innerHTML = `<b style='font-family: Kalam, cursive;'>Turno del jugador ${turn}</>`;
	nextTurn = turn;
};

function drawMatrix() {
	for (let i = 0; i < 9; i++) {
		let id = i + 1;
		$container.innerHTML += `
			<button class="boton" id="${id}">-</button>
		`;
	}
	const $button = document.getElementsByClassName("boton") as HTMLCollectionOf<HTMLButtonElement>;
	for (let boton of $button) {
		boton.onclick = function () {
			const $cuadro = document.getElementById(boton.id) as HTMLButtonElement;
			if (nextTurn === 1) {
				checkNextMove({
					button: $cuadro,
					move: player1Move,
					color: "#00f",
					turn: player2,
				});
			} else {
				checkNextMove({
					button: $cuadro,
					move: player2Move,
					color: "#f00",
					turn: player1,
				});
			}
			checkWinner();
		};
	}
}

function message(data: Message) {
	const { boton, btn1, btn2, btn3, jugador } = data;
	Swal.fire({
		title: '<strong style="font-family: Kalam, cursive; color: #C3FF99;">HAY UN GANADOR</strong>',
		html:
			'<span style="font-family: Kalam, cursive;">¡El jugador ' +
			jugador +
			" ha ganado!</span>",
		position: "center",
		icon: "success",
		color: "#fff",
		showClass: {
			popup: "animate__animated animate__backInDown",
		},
		hideClass: {
			popup: "animate__animated animate__backOutUp",
		},
		background: "#16213E",
		showConfirmButton: true,
	});
	//Boton 1
	btn1.style.background = "#1C6758";
	btn1.style.color = "#fff";
	btn1.style.border = "2px solid #fff";
	//Boton 2
	btn2.style.background = "#1C6758";
	btn2.style.color = "#fff";
	btn2.style.border = "2px solid #fff";
	//Boton 3
	btn3.style.background = "#1C6758";
	btn3.style.color = "#fff";
	btn3.style.border = "2px solid #fff";

	let copyButtons = Array.from(boton);
	for (let i = 0; i < copyButtons.length; i++) {
		if (
			+copyButtons[i].id !== +btn1.id &&
			+copyButtons[i].id !== +btn2.id &&
			+copyButtons[i].id !== +btn3.id
		) {
			copyButtons[i].disabled = true;
			copyButtons[i].style.background = "#16213E";
			copyButtons[i].style.color = "#777";
			copyButtons[i].style.cursor = "default";
			copyButtons[i].style.border = "2px solid #444";
		}
	}
	$turn.textContent = "";
}

function winner(data: Winner) {
	const { botones, boton, playerMove, playerTurn } = data;
	/** ### X ### */
	// Verificar en cada fila si existen 3 'X' consecutivos
	if (
		botones[0].textContent === playerMove &&
		botones[1].textContent === playerMove &&
		botones[2].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[0],
			btn2: botones[1],
			btn3: botones[2],
			jugador: playerTurn,
		});
	} else if (
		botones[3].textContent === playerMove &&
		botones[4].textContent === playerMove &&
		botones[5].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[3],
			btn2: botones[4],
			btn3: botones[5],
			jugador: playerTurn,
		});
	} else if (
		botones[6].textContent === playerMove &&
		botones[7].textContent === playerMove &&
		botones[8].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[6],
			btn2: botones[7],
			btn3: botones[8],
			jugador: playerTurn,
		});

		//Verificar en cada columna si existen 3 'X' consecutivos
	} else if (
		botones[0].textContent === playerMove &&
		botones[3].textContent === playerMove &&
		botones[6].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[0],
			btn2: botones[3],
			btn3: botones[6],
			jugador: playerTurn,
		});
	} else if (
		botones[1].textContent === playerMove &&
		botones[4].textContent === playerMove &&
		botones[7].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[1],
			btn2: botones[4],
			btn3: botones[7],
			jugador: playerTurn,
		});
	} else if (
		botones[2].textContent === playerMove &&
		botones[5].textContent === playerMove &&
		botones[8].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[2],
			btn2: botones[5],
			btn3: botones[8],
			jugador: playerTurn,
		});

		// Verificar en la diagonal si existen 3 'X' consecutivos
	} else if (
		botones[0].textContent === playerMove &&
		botones[4].textContent === playerMove &&
		botones[8].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[0],
			btn2: botones[4],
			btn3: botones[8],
			jugador: playerTurn,
		});
	} else if (
		botones[2].textContent === playerMove &&
		botones[4].textContent === playerMove &&
		botones[6].textContent === playerMove
	) {
		message({
			boton,
			btn1: botones[2],
			btn2: botones[4],
			btn3: botones[6],
			jugador: playerTurn,
		});
	}
}

function tie(data: Tie) {
	const { botones, boton, jugador1, jugador2 } = data;
	if (
		(botones[0].textContent === jugador1 || botones[0].textContent === jugador2) &&
		(botones[1].textContent === jugador1 || botones[1].textContent === jugador2) &&
		(botones[2].textContent === jugador1 || botones[2].textContent === jugador2) &&
		(botones[3].textContent === jugador1 || botones[3].textContent === jugador2) &&
		(botones[4].textContent === jugador1 || botones[4].textContent === jugador2) &&
		(botones[5].textContent === jugador1 || botones[5].textContent === jugador2) &&
		(botones[6].textContent === jugador1 || botones[6].textContent === jugador2) &&
		(botones[7].textContent === jugador1 || botones[7].textContent === jugador2) &&
		(botones[8].textContent === jugador1 || botones[8].textContent === jugador2)
	) {
		Swal.fire({
			title: '<strong style="font-family: Kalam, cursive; color: #C3FF99;">NO hay un ganador</strong>',
			html: '<span style="font-family: Kalam, cursive;">¡Han quedado en empate!</span>',
			position: "center",
			icon: "warning",
			color: "#fff",
			showClass: {
				popup: "animate__animated animate__backInDown",
			},
			hideClass: {
				popup: "animate__animated animate__backOutUp",
			},
			background: "#16213E",
			showConfirmButton: true,
		});
		let copyButtons = Array.from(boton);
		for (let i = 0; i < copyButtons.length; i++) {
			copyButtons[i].disabled = true;
			copyButtons[i].style.background = "#16213E";
			copyButtons[i].style.color = "#777";
			copyButtons[i].style.cursor = "default";
			copyButtons[i].style.border = "2px solid #444";
		}
		$turn.textContent = "";
	}
}

function checkWinner() {
	// llamamos a todos los botones creados
	let buttons = [
		document.getElementById("1") as HTMLButtonElement,
		document.getElementById("2") as HTMLButtonElement,
		document.getElementById("3") as HTMLButtonElement,
		document.getElementById("4") as HTMLButtonElement,
		document.getElementById("5") as HTMLButtonElement,
		document.getElementById("6") as HTMLButtonElement,
		document.getElementById("7") as HTMLButtonElement,
		document.getElementById("8") as HTMLButtonElement,
		document.getElementById("9") as HTMLButtonElement,
	];

	const $boton = document.getElementsByClassName("boton") as HTMLCollectionOf<HTMLButtonElement>;

	/** ### X ### */
	winner({
		botones: buttons,
		boton: $boton,
		playerMove: player1Move,
		playerTurn: player1,
	});

	/** ### O ### */
	winner({
		botones: buttons,
		boton: $boton,
		playerMove: player2Move,
		playerTurn: player2,
	});

	/** ### TIE ### */
	tie({
		botones: buttons,
		boton: $boton,
		jugador1: player1Move,
		jugador2: player2Move,
	});
}

// ### INICIO DEL JUEGO ###
window.onload = function () {
	drawMatrix();
};
