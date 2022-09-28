import Square from "./Square.mjs";

export default function Gameboard() {
    let squares = new Array(9).fill("");
    squares = squares.map((square, index) => Square(index));

    const gameBoard = {
        gameStarted: false,
        gameOver: false,
        squares: squares
    }

    return gameBoard;
}
