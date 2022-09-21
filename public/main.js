/** ### VARIABLES ### */

const $container = document.getElementById('app');
const $fragment = document.createDocumentFragment();
const $turn = document.getElementById('turn');

let player1Move = 'X', player2Move = 'O';
let player1 = 1, player2 = 2;
let nextTurn = player1;

//Imprimir el turno del jugador correspondiente
$turn.textContent = 'Turno del jugador 1';

//Evento para resetear el juego
document.getElementById('reset').addEventListener('click', _ => {
    location.reload();
})

/** ### FUNCIONES ### */
function drawMatrix() {
    for (let i = 0; i < 9; i++) {
        const $button = document.createElement('button');
        $button.setAttribute('onclick', `colocarXO(${i + 1})`)
        $button.classList.add('boton');
        $button.id = i + 1;
        $button.style.border = '2px solid #fff';
        $button.style.color = '#fff';
        $button.style.background = '#E94560';
        $button.style.font = '22px Verdana';
        $button.innerText = '-';
        $button.style.width = '100px';
        $button.style.height = '100px';
        $button.style.cursor = 'pointer';
        $button.style.borderRadius = '10px';
        $fragment.appendChild($button);
    }
    $container.appendChild($fragment);
}

function colocarXO(casilla) {
    const $cuadro = document.getElementById(casilla);
    if (nextTurn === 1) {
        $cuadro.disabled = true;
        $cuadro.innerText = player1Move;
        $cuadro.style.background = '#16213E';
        $cuadro.style.color = '#777';
        $cuadro.style.cursor = 'default';
        $cuadro.style.border = '2px solid #444';
        document.getElementById('turn').innerText = 'Turno del jugador 2';
        nextTurn = player2;

    } else {
        $cuadro.disabled = true;
        $cuadro.innerText = player2Move;
        $cuadro.style.background = '#16213E';
        $cuadro.style.color = '#777';
        $cuadro.style.cursor = 'default';
        $cuadro.style.border = '2px solid #444';
        document.getElementById('turn').innerText = 'Turno del jugador 1';
        nextTurn = player1;
    }
    checkWinner();
}

function message({ boton, btn1, btn2, btn3, jugador }) {
    Swal.fire({
        title: '<strong style="font-family: Kalam, cursive; color: #C3FF99;">HAY UN GANADOR</strong>',
        html: '<span style="font-family: Kalam, cursive;">¡El jugador ' + jugador + ' ha ganado!</span>',
        position: 'center',
        icon: 'success',
        color: '#fff',
        showClass: {
            popup: 'animate__animated animate__backInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__backOutUp'
        },
        background: '#16213E',
        showConfirmButton: true,
    });
    //Boton 1
    btn1.style.background = '#1C6758';
    btn1.style.color = '#fff';
    btn1.style.border = '2px solid #fff';
    //Boton 2
    btn2.style.background = '#1C6758';
    btn2.style.color = '#fff';
    btn2.style.border = '2px solid #fff';
    //Boton 3
    btn3.style.background = '#1C6758';
    btn3.style.color = '#fff';
    btn3.style.border = '2px solid #fff';

    let copyButtons = Array.from(boton);
    for (let i = 0; i < copyButtons.length; i++) {
        if (+copyButtons[i].id !== +btn1.id && +copyButtons[i].id !== +btn2.id && +copyButtons[i].id !== +btn3.id) {
            copyButtons[i].disabled = true;
            copyButtons[i].style.background = '#16213E';
            copyButtons[i].style.color = '#777';
            copyButtons[i].style.cursor = 'default';
            copyButtons[i].style.border = '2px solid #444';
        }
    }
    $turn.innerText = '';
}

function winner({ botones, boton, playerMove, playerTurn }) {
    /** ### X ### */
    // Verificar en cada fila si existen 3 'X' consecutivos
    if ((botones.one.textContent === playerMove) && (botones.two.textContent === playerMove) && (botones.three.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.one,
            btn2: botones.two,
            btn3: botones.three,
            jugador: playerTurn
        });
    } else if ((botones.four.textContent === playerMove) && (botones.five.textContent === playerMove) && (botones.six.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.four,
            btn2: botones.five,
            btn3: botones.six,
            jugador: playerTurn
        });

    } else if ((botones.seven.textContent === playerMove) && (botones.eigth.textContent === playerMove) && (botones.nine.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.seven,
            btn2: botones.eigth,
            btn3: botones.nine,
            jugador: playerTurn
        });

        //Verificar en cada columna si existen 3 'X' consecutivos
    } else if ((botones.one.textContent === playerMove) && (botones.four.textContent === playerMove) && (botones.seven.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.one,
            btn2: botones.four,
            btn3: botones.seven,
            jugador: playerTurn
        });

    } else if ((botones.two.textContent === playerMove) && (botones.five.textContent === playerMove) && (botones.eigth.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.two,
            btn2: botones.five,
            btn3: botones.eigth,
            jugador: playerTurn
        });

    } else if ((botones.three.textContent === playerMove) && (botones.six.textContent === playerMove) && (botones.nine.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.three,
            btn2: botones.six,
            btn3: botones.nine,
            jugador: playerTurn
        });

        // Verificar en la diagonal si existen 3 'X' consecutivos
    } else if ((botones.one.textContent === playerMove) && (botones.five.textContent === playerMove) && (botones.nine.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.one,
            btn2: botones.five,
            btn3: botones.nine,
            jugador: playerTurn
        });

    } else if ((botones.three.textContent === playerMove) && (botones.five.textContent === playerMove) && (botones.seven.textContent === playerMove)) {
        message({
            boton,
            btn1: botones.three,
            btn2: botones.five,
            btn3: botones.seven,
            jugador: playerTurn
        });
    }
}

function tie({ botones, boton, jugador1, jugador2 }) {
    if ((botones.one.textContent === jugador1 || botones.one.textContent === jugador2) && (botones.two.textContent === jugador1 || botones.two.textContent === jugador2) && (botones.three.textContent === jugador1 || botones.three.textContent === jugador2) && (botones.four.textContent === jugador1 || botones.four.textContent === jugador2) && (botones.five.textContent === jugador1 || botones.five.textContent === jugador2) && (botones.six.textContent === jugador1 || botones.six.textContent === jugador2) && (botones.seven.textContent === jugador1 || botones.seven.textContent === jugador2) && (botones.eigth.textContent === jugador1 || botones.eigth.textContent === jugador2) && (botones.nine.textContent === jugador1 || botones.nine.textContent === jugador2)) {
        Swal.fire({
            title: '<strong style="font-family: Kalam, cursive; color: #C3FF99;">NO hay un ganador</strong>',
            html: '<span style="font-family: Kalam, cursive;">¡Han quedado en empate!</span>',
            position: 'center',
            icon: 'warning',
            color: '#fff',
            showClass: {
                popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutUp'
            },
            background: '#16213E',
            showConfirmButton: true,
        });
        let copyButtons = Array.from(boton);
        for (let i = 0; i < copyButtons.length; i++) {
            copyButtons[i].disabled = true;
            copyButtons[i].style.background = '#16213E';
            copyButtons[i].style.color = '#777';
            copyButtons[i].style.cursor = 'default';
            copyButtons[i].style.border = '2px solid #444';
        }
        $turn.textContent = '';

    }

}
function checkWinner() {
    // llamamos a todos los botones creados
    let buttons = {
        'one': document.getElementById('1'),
        'two': document.getElementById('2'),
        'three': document.getElementById('3'),
        'four': document.getElementById('4'),
        'five': document.getElementById('5'),
        'six': document.getElementById('6'),
        'seven': document.getElementById('7'),
        'eigth': document.getElementById('8'),
        'nine': document.getElementById('9'),
    }

    const $boton = document.getElementsByClassName('boton');

    /** ### X ### */
    winner({
        botones: buttons,
        boton: $boton,
        playerMove: player1Move,
        playerTurn: player1
    });

    /** ### O ### */
    winner({
        botones: buttons,
        boton: $boton,
        playerMove: player2Move,
        playerTurn: player2
    });

    /** ### TIE ### */
    tie({
        botones: buttons,
        boton: $boton,
        jugador1: player1Move,
        jugador2: player2Move
    });

}

function incio() {
    drawMatrix();
}

// ### INICIO DEL JUEGO ###
window.onload = incio();