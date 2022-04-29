let Player = function(name, marker, turn) {
    let startTurn = () => {
        return true;
    }
    
    let endTurn = () => {
        return false;
    }

    let placeMarker = (event) => {
        if (event.textContent) {
            event.status = 'filled';
            return;
        } else {
            event.textContent = marker;
        }
    }
    return { name, marker, turn, placeMarker, startTurn, endTurn };
}

let playerOne = Player('Player1', 'X', true);
let playerTwo = Player('Player2', 'O', false);

let Square = function(DOMObject) {
    let status;
    let handleEvent = () => {
        if (playerOne.turn) {
            if (DOMObject.status) {
                console.log('hey P1, there is something here arleady');
                return;
            } else if (!DOMObject.status) {
                playerOne.placeMarker(DOMObject);
                playerOne.turn = playerOne.endTurn();
                playerTwo.turn = playerTwo.startTurn();
            }
        } else if (playerTwo.turn) {
            if (DOMObject.status) {
                console.log('P2, theres something here');
                return;
            } else if (!DOMObject.status) {
                playerTwo.placeMarker(DOMObject);
                playerTwo.turn = playerTwo.endTurn();
                playerOne.turn = playerOne.startTurn();
            }
        }
    }
    DOMObject.addEventListener('click', handleEvent);
    return DOMObject;
}

for (square of document.querySelector('.game-board').children) {
    Square(square);
    
}