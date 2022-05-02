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

let playerOne = Player('Player One', 'X', true);
let playerTwo = Player('Player Two', 'O', false);
document.querySelector('.current-player-turn').textContent = `${playerOne.name}'s turn!`;

let Square = function(DOMObject) {
    DOMObject.status = false;
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
            } else if (playerTwo.turn) {
                document.querySelector('.current-player-turn').textContent = `${playerOne.name}'s turn!`;
                playerTwo.placeMarker(DOMObject);
                playerTwo.turn = playerTwo.endTurn();
                playerOne.turn = playerOne.startTurn();
                DOMObject.status = true;
            }
        }
    }
    DOMObject.addEventListener('click', handleEvent);
    return DOMObject;
}

for (square of document.querySelector('.game-board').children) {
    Square(square);
    
}