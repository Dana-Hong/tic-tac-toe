import StartGame from "./StartGame.mjs";

let startBtn = document.querySelector('.start-btn');

const player1inputElement = document.querySelector('#player-one-input');
const player2inputElement = document.querySelector('#player-two-input');


function handleStartGame() {
    let player1 = player1inputElement.value;
    let player2 = player2inputElement.value;

    if (player1 === '' && player2 === '') {
        player1 = 'Player One';
        player2 = 'Player Two';
    } else if (player1 === '') {
        player1 = 'Player One';
    } else if (player2 === '') {
        player2 = 'Player Two';
    }

    document.querySelector('.main-menu').classList.add('invisible');
    const game = StartGame(player1, player2);
    return game;
    
}

startBtn.addEventListener('click', handleStartGame);

