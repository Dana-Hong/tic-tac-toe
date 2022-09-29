import Player from "./Player.mjs";
import Gameboard from "./Gameboard.mjs";
import winningCoordinates from "./winningCoordinates.mjs";

function StartGame(player1, player2) {
    let gameBoard = setUpGame(player1, player2);

    function setUpGame(player1, player2) {
        const gameBoard = Gameboard();        
        gameBoard.player1 = Player(player1, '✕');
        gameBoard.player2 = Player(player2, 'O');
        gameBoard.player1.turn = true;
        gameBoard.currentPlayer = gameBoard.player1;
        gameBoard.gameBoardMessageElement.textContent = `${gameBoard.currentPlayer.name}'s Turn`;
        Array.from(gameBoard.gameBoardElement.children).map(square => square.addEventListener('click', (event) => handleSquareClick(event, gameBoard.currentPlayer)));
        return gameBoard;
    }

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
        gameBoard.player1.turn ? gameBoard.player1.placements.push(target.id) : gameBoard.player2.placements.push(target.id);
    }
    
    function checkWin(currentPlayer) {
        gameBoard.gameOver = Object.values(winningCoordinates).some(row => row.every(marker => gameBoard.currentPlayer.placements.includes(marker)));
        gameBoard.gameOver ? currentPlayer.won = true : '';
        if (currentPlayer.won) {
            gameBoard.winner = currentPlayer.name;
        }
    }

    function checkTie() {
        if (gameBoard.player1.placements.length === 5 && gameBoard.winner === null) {
            gameBoard.winner = `It's a draw!`;
        }
    }
    
    function switchTurns() {
        if (gameBoard.player1.turn) {
            gameBoard.player1.turn = false;
            gameBoard.player2.turn = true;
            gameBoard.currentPlayer = gameBoard.player2;
        } else {
            gameBoard.player1.turn = true;
            gameBoard.player2.turn = false;
            gameBoard.currentPlayer = gameBoard.player1;
        }
    }

    function updateDOM() {
        if (!gameBoard.gameOver) {
            gameBoard.gameBoardMessageElement.textContent =  `${gameBoard.currentPlayer.name}'s Turn`
        } else if (gameBoard.winner === `It's a draw!`) {
            gameBoard.gameBoardMessageElement.textContent = `It's a draw!`
            gameBoard.resetBtn.disabled = false;
            gameBoard.resetBtn.classList.remove('invisible');
        } else if (gameBoard.gameOver) {
            gameBoard.gameBoardMessageElement.textContent = `${gameBoard.winner} Wins!`
            gameBoard.resetBtn.disabled = false;
            gameBoard.resetBtn.classList.remove('invisible');
        }
    }

}

export default StartGame;