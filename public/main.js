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
    if (nextTurn === 1) {
        document.getElementById(casilla).disabled = true;
        document.getElementById(casilla).innerText = player1Move;
        document.getElementById(casilla).style.background = '#16213E';
        document.getElementById(casilla).style.color = '#777';
        document.getElementById(casilla).style.cursor = 'default';
        document.getElementById(casilla).style.border = '2px solid #444';
        document.getElementById('turn').innerText = 'Turno del jugador 2';
        nextTurn = player2;

    } else {
        document.getElementById(casilla).disabled = true;
        document.getElementById(casilla).innerText = player2Move;
        document.getElementById(casilla).style.background = '#16213E';
        document.getElementById(casilla).style.color = '#777';
        document.getElementById(casilla).style.cursor = 'default';
        document.getElementById(casilla).style.border = '2px solid #444';
        document.getElementById('turn').innerText = 'Turno del jugador 1';
        nextTurn = player1;
    }
    checkWinner();
}

function winner({ boton, btn1, btn2, btn3, jugador }) {
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

function checkWinner() {
    // llamamos a todos los botones creados
    const $btn1 = document.getElementById('1');
    const $btn2 = document.getElementById('2');
    const $btn3 = document.getElementById('3');
    const $btn4 = document.getElementById('4');
    const $btn5 = document.getElementById('5');
    const $btn6 = document.getElementById('6');
    const $btn7 = document.getElementById('7');
    const $btn8 = document.getElementById('8');
    const $btn9 = document.getElementById('9');
    const $boton = document.getElementsByClassName('boton');


    /** ### X ### */
    // Verificar en cada fila si existen 3 'X' consecutivos
    if (($btn1.textContent === player1Move) && ($btn2.textContent === player1Move) && ($btn3.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn2,
            btn3: $btn3,
            jugador: 1
        });
    } else if (($btn4.textContent === player1Move) && ($btn5.textContent === player1Move) && ($btn6.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn4,
            btn2: $btn5,
            btn3: $btn6,
            jugador: 1
        });

    } else if (($btn7.textContent === player1Move) && ($btn8.textContent === player1Move) && ($btn9.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn7,
            btn2: $btn8,
            btn3: $btn9,
            jugador: 1
        });

        // Verificar en cada columna si existen 3 'X' consecutivos
    } else if (($btn1.textContent === player1Move) && ($btn4.textContent === player1Move) && ($btn7.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn4,
            btn3: $btn7,
            jugador: 1
        });

    } else if (($btn2.textContent === player1Move) && ($btn5.textContent === player1Move) && ($btn8.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn2,
            btn2: $btn5,
            btn3: $btn8,
            jugador: 1
        });

    } else if (($btn3.textContent === player1Move) && ($btn6.textContent === player1Move) && ($btn9.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn3,
            btn2: $btn6,
            btn3: $btn9,
            jugador: 1
        });

        // Verificar en la diagonal si existen 3 'X' consecutivos
    } else if (($btn1.textContent === player1Move) && ($btn5.textContent === player1Move) && ($btn9.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn5,
            btn3: $btn9,
            jugador: 1
        });

    } else if (($btn3.textContent === player1Move) && ($btn5.textContent === player1Move) && ($btn7.textContent === player1Move)) {
        winner({
            boton: $boton,
            btn1: $btn3,
            btn2: $btn5,
            btn3: $btn7,
            jugador: 1
        });

        /** ### O ### */
        // Verificar en cada fila si existen 3 'X' consecutivos
    } else if (($btn1.textContent === player2Move) && ($btn2.textContent === player2Move) && ($btn3.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn2,
            btn3: $btn3,
            jugador: 2
        });

    } else if (($btn4.textContent === player2Move) && ($btn5.textContent === player2Move) && ($btn6.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn4,
            btn2: $btn5,
            btn3: $btn6,
            jugador: 2
        });

    } else if (($btn7.textContent === player2Move) && ($btn8.textContent === player2Move) && ($btn9.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn7,
            btn2: $btn8,
            btn3: $btn9,
            jugador: 2
        });

        // Verificar en cada columna si existen 3 'X' consecutivos
    } else if (($btn1.textContent === player2Move) && ($btn4.textContent === player2Move) && ($btn7.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn4,
            btn3: $btn7,
            jugador: 2
        });

    } else if (($btn2.textContent === player2Move) && ($btn5.textContent === player2Move) && ($btn8.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn2,
            btn2: $btn5,
            btn3: $btn8,
            jugador: 2
        });

    } else if (($btn3.textContent === player2Move) && ($btn6.textContent === player2Move) && ($btn9.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn3,
            btn2: $btn6,
            btn3: $btn9,
            jugador: 2
        });

        // Verificar en la diagonal si existen 3 'X' consecutivos
    } else if (($btn1.textContent === player2Move) && ($btn5.textContent === player2Move) && ($btn9.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn1,
            btn2: $btn5,
            btn3: $btn9,
            jugador: 2
        });

    } else if (($btn3.textContent === player2Move) && ($btn5.textContent === player2Move) && ($btn7.textContent === player2Move)) {
        winner({
            boton: $boton,
            btn1: $btn3,
            btn2: $btn5,
            btn3: $btn7,
            jugador: 2
        });


    } else if (($btn1.textContent === player1Move || $btn1.textContent === player2Move) && ($btn2.textContent === player1Move || $btn2.textContent === player2Move) && ($btn3.textContent === player1Move || $btn3.textContent === player2Move) && ($btn4.textContent === player1Move || $btn4.textContent === player2Move) && ($btn5.textContent === player1Move || $btn5.textContent === player2Move) && ($btn6.textContent === player1Move || $btn6.textContent === player2Move) && ($btn7.textContent === player1Move || $btn7.textContent === player2Move) && ($btn8.textContent === player1Move || $btn8.textContent === player2Move) && ($btn9.textContent === player1Move || $btn9.textContent === player2Move)) {
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
        let copyButtons = Array.from($boton);
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

function incio() {
    drawMatrix();
}

// ### INICIO DEL JUEGO ###
window.onload = incio();