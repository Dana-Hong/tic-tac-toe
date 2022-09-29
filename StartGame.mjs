import Player from "./Player.mjs";
import Gameboard from "./Gameboard.mjs";
import winningCoordinates from "./winningCoordinates.mjs";

function StartGame(player1name, player2name) {
    let gameBoard = setUpGame(player1name, player2name);
    let {
        player1,
        player2,
        currentPlayer,
        gameBoardMessageElement,
        gameOver,
        winner,
        resetBtn
    } = gameBoard;

    function setUpGame(player1name, player2name) {
        const gameBoard = Gameboard();        
        gameBoard.player1 = Player(player1name, '✕');
        gameBoard.player2 = Player(player2name, 'O');
        gameBoard.player1.turn = true;
        gameBoard.currentPlayer = gameBoard.player1;
        gameBoard.gameBoardMessageElement.textContent = `${gameBoard.currentPlayer.name}'s Turn`;
        Array.from(gameBoard.gameBoardElement.children).map(square => square.addEventListener('click', (event) => handleSquareClick(event, gameBoard.currentPlayer)));
        return gameBoard;
    }

    function handleSquareClick(event, currentPlayer) {
        if (gameOver) {
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
        gameOver = Object.values(winningCoordinates).some(row => row.every(marker => currentPlayer.placements.includes(marker)));
        gameOver ? currentPlayer.won = true : '';
        if (currentPlayer.won) {
            winner = currentPlayer.name;
        }
    }

    function checkTie() {
        if (player1.placements.length === 5 && winner === null) {
            winner = `It's a draw!`;
        }
    }
    
    function switchTurns() {
        if (player1.turn) {
            player1.turn = false;
            player2.turn = true;
            currentPlayer = gameBoard.player2;
        } else {
            player1.turn = true;
            player2.turn = false;
            currentPlayer = player1;
        }
    }

    function updateDOM() {
        if (!gameOver) {
            gameBoardMessageElement.textContent =  `${currentPlayer.name}'s Turn`
        } else if (gameBoard.winner === `It's a draw!`) {
            gameBoardMessageElement.textContent = `It's a draw!`
            resetBtn.disabled = false;
            resetBtn.classList.remove('invisible');
        } else if (gameOver) {
            gameBoardMessageElement.textContent = `${winner} Wins!`
            resetBtn.disabled = false;
            resetBtn.classList.remove('invisible');
        }
    }

}

export default StartGame;