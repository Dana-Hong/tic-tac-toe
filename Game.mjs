import Player from "./Player.mjs";
import Gameboard from "./Gameboard.mjs";
import winningCoordinates from "./winningCoordinates.mjs";

function startGame() {
    const gameBoard = Gameboard();
    let squares = Array.from(gameBoard.gameBoardElement.children);
    squares.map(square => square.addEventListener('click', (event) => handleSquareClick(event, currentPlayer)));
    
    const player1 = Player('Dana', '✕');
    const player2 = Player('Esther', 'O');
    player1.turn = true;
    
    let currentPlayer = player1;
    const gameMessage = document.querySelector('.game-message');
    gameMessage.textContent = `${currentPlayer.name}'s Turn`;
    
    function handleSquareClick(event, currentPlayer) {
        if (gameBoard.gameOver) {
            return;
        }
        placeMarker(event, currentPlayer);
        checkWin(currentPlayer);
        checkTie();
        switchTurns();
        updateDOM();
    }
    
    function placeMarker(event, currentPlayer) {
        const {target} = event;
        target.textContent = currentPlayer.marker;
        target.disabled = true;
        player1.turn ? player1.placements.push(target.id) : player2.placements.push(target.id);
    }
    
    function checkWin(currentPlayer) {
        gameBoard.gameOver = Object.values(winningCoordinates).some(row => row.every(marker => currentPlayer.placements.includes(marker)));
        gameBoard.gameOver ? currentPlayer.won = true : '';
        if (currentPlayer.won) {
            console.log('heyyyyy');
            gameBoard.winner = currentPlayer.name;
        }
    }

    function checkTie() {
        if (player1.placements.length === 5 && gameBoard.winner === null) {
            gameBoard.winner = `It's a draw!`;
        }
    }
    
    function switchTurns() {
        if (player1.turn) {
            player1.turn = false;
            player2.turn = true;
            currentPlayer = player2;
        } else {
            player1.turn = true;
            player2.turn = false;
            currentPlayer = player1;
        }
    }

    function updateDOM() {
        if (!gameBoard.gameOver) {
            gameMessage.textContent =  `${currentPlayer.name}'s Turn`
        } else if (gameBoard.winner === `It's a draw!`) {
            gameMessage.textContent = `It's a draw!`
            gameBoard.resetBtn.disabled = false;
        } else if (gameBoard.gameOver) {
            gameMessage.textContent = `${gameBoard.winner} Wins!`
            gameBoard.resetBtn.disabled = false;
        }
    }
}

export default startGame;