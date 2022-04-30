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

let playerOne = Player('Player1', 'X', true);
let playerTwo = Player('Player2', 'O', false);

let Square = function(DOMObject) {
    DOMObject.status = false;
    let handleEvent = () => {
        if (DOMObject.status) {
            return console.log('square filled already', playerOne.turn, `testing:`, DOMObject.status);
        } else if (!DOMObject.status) {
            if (playerOne.turn) {
                playerOne.placeMarker(DOMObject);
                playerOne.turn = playerOne.endTurn();
                playerTwo.turn = playerTwo.startTurn();
                DOMObject.status = true;
                console.log('hey1');
            } else if (playerTwo.turn) {
                playerTwo.placeMarker(DOMObject);
                playerTwo.turn = playerTwo.endTurn();
                playerOne.turn = playerOne.startTurn();
                DOMObject.status = true;
                console.log('hey2');
            }
        }
    }
    DOMObject.addEventListener('click', handleEvent);
    return DOMObject;
}

for (square of document.querySelector('.game-board').children) {
    Square(square);
    
}