import Square from "./Square.mjs";

export default function Gameboard() {
    const gameBoard = {
        gameStarted: false,
        gameOver: false,
        winner: null,
        gameBoardElement: document.createElement('div'),
        resetBtn: document.createElement('button')
    }

    let squares = new Array(9).fill("");
    gameBoard.squares = squares.map((square, index) => {
        square = Square(index);
        gameBoard.gameBoardElement.append(square);
    });


    document.querySelector('.container').append(gameBoard.gameBoardElement, gameBoard.resetBtn);
    gameBoard.resetBtn.textContent = 'Reset';
    gameBoard.resetBtn.disabled = true;
    gameBoard.gameBoardElement.classList.add('gameboard');

    return gameBoard;
}
