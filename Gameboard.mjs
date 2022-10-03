import Square from "./Square.mjs";

export default function Gameboard() {
    const gameBoard = {
        player1: null,
        player2: null,
        currentPlayer: null,
        gameOver: false,
        winner: null,
        gameBoardContainerElement: document.createElement('div'),
        gameBoardElement: document.createElement('div'),
        gameBoardMessageElement: document.createElement('p'),
        resetBtn: document.createElement('button'),
        backToMainBtn: document.createElement('button')
    }

    let squares = new Array(9).fill("");
    gameBoard.squares = squares.map((square, index) => {
        square = Square(index);
        gameBoard.gameBoardElement.append(square);
    });

    const gameTitle = document.createElement('h1');
    gameTitle.classList.add('game-title');
    gameBoard.gameBoardMessageElement.classList.add('game-message');
    gameBoard.gameBoardContainerElement.classList.add('container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-container');
    buttonContainer.append(gameBoard.resetBtn, gameBoard.backToMainBtn);
    gameBoard.gameBoardContainerElement.append(gameTitle, gameBoard.gameBoardMessageElement, gameBoard.gameBoardElement, buttonContainer);
    document.body.append(gameBoard.gameBoardContainerElement);

    gameBoard.resetBtn.textContent = 'Reset';
    gameBoard.resetBtn.disabled = true;
    gameBoard.resetBtn.classList.add('btn', 'invisible');
    gameBoard.backToMainBtn.textContent = 'Back to Main Menu';
    gameBoard.backToMainBtn.disabled = true;
    gameBoard.backToMainBtn.classList.add('btn', 'invisible');
    gameBoard.gameBoardElement.classList.add('gameboard');

    return gameBoard;
}
