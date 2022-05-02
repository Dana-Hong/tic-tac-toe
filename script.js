let Player = function(name, marker, turn) {
    let startTurn = () => {
        return true;
    }
    
    let endTurn = () => {
        return false;
    }

    let placeMarker = (event) => {
        event.textContent = marker;
    }

    return { name, marker, turn, placeMarker, startTurn, endTurn };
}


let Square = function(DOMObject) {
    DOMObject.status = false;
    DOMObject.marker;
    let handleEvent = () => {
        if (DOMObject.status) {
            return;
        } else if (!DOMObject.status) {
            if (playerOne.turn) {
                document.querySelector('.current-player-turn').textContent = `${playerTwo.name}'s turn!`;
                playerOne.placeMarker(DOMObject);
                playerOne.turn = playerOne.endTurn();
                playerTwo.turn = playerTwo.startTurn();
                DOMObject.status = true;
                addMarkerToBoard(playerOne.marker, DOMObject.id);
                checkWin(playerOne);
            } else if (playerTwo.turn) {
                document.querySelector('.current-player-turn').textContent = `${playerOne.name}'s turn!`;
                playerTwo.placeMarker(DOMObject);
                playerTwo.turn = playerTwo.endTurn();
                playerOne.turn = playerOne.startTurn();
                DOMObject.status = true;
                addMarkerToBoard(playerTwo.marker, DOMObject.id);
                checkWin(playerTwo);
            }
        }
    }
    DOMObject.addEventListener('click', handleEvent);
    return DOMObject;
}

let gameBoard = {
    row1: [],
    row2: [],
    row3: [],
    col1: [],
    col2: [],
    col3: [],
    dia1: [],
    dia2: [],
    
}

let playerOne = Player('Player One', 'X', true);
let playerTwo = Player('Player Two', 'O', false);
document.querySelector('.current-player-turn').textContent = `${playerOne.name}'s turn!`;

let count = 0;

for (square of document.querySelector('.game-board').children) {
    Square(square);
    square.id = count;
    count++;
}

let checkWin = (player) => {
    for (let row_col_diag in gameBoard) {
        if (gameBoard[row_col_diag].length === 3 && gameBoard[row_col_diag].every(marker => marker === player.marker)) {
            console.log(`${player.name} wins!`);
        }
    }
}

let addMarkerToBoard = (playerMarker, squareID) => {
    switch (squareID) {
        case '0':
            gameBoard.row1.push(playerMarker);
            gameBoard.col1.push(playerMarker);
            gameBoard.dia1.push(playerMarker);
            break;
        case '1':
            gameBoard.row1.push(playerMarker);
            gameBoard.col2.push(playerMarker);
            break;
        case '2':
            gameBoard.row1.push(playerMarker);
            gameBoard.col3.push(playerMarker);
            gameBoard.dia2.push(playerMarker);
            break;
        case '3':
            gameBoard.row2.push(playerMarker);
            gameBoard.col1.push(playerMarker);
            break;
        case '4':
            gameBoard.row2.push(playerMarker);
            gameBoard.col2.push(playerMarker);
            gameBoard.dia1.push(playerMarker);
            gameBoard.dia2.push(playerMarker);
            break;
        case '5':
            gameBoard.row2.push(playerMarker);
            gameBoard.col3.push(playerMarker);
            break;
        case '6':
            gameBoard.row3.push(playerMarker);
            gameBoard.col1.push(playerMarker);
            gameBoard.dia2.push(playerMarker);
            break;
        case '7':
            gameBoard.row3.push(playerMarker);
            gameBoard.col2.push(playerMarker);
            break;
        case '8':
            gameBoard.row3.push(playerMarker);
            gameBoard.col3.push(playerMarker);
            gameBoard.dia1.push(playerMarker);
            break;
    }
}