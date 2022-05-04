(function() {
    let currentPlayer = document.querySelector('.current-player-turn');
    let playerCreation = document.querySelector('.player-creation-screen');
    let playerOneInput = document.querySelector('#player-one');
    let playerTwoInput = document.querySelector('#player-two');
    let playerOneWinDisplay = document.querySelector('.player-one > .win-display');
    let playerTwoWinDisplay = document.querySelector('.player-two > .win-display');
    let playerOneName = document.querySelector('.p1-name');
    let playerTwoName = document.querySelector('.p2-name');

    playerCreation.showModal();

    let buttons = {
        createPlayer: document.querySelector('#create-player-btn'),
        playAgain: document.querySelector('.play-again'),
        newGame: document.querySelector('.new-game'),
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

    let Player = function(name, marker, turn, score, display) {
        let startTurn = () => {
            return true;
        }
        
        let endTurn = () => {
            return false;
        }

        let placeMarker = (event) => {
            event.textContent = marker;
        }

        return { name, marker, turn, score, display, placeMarker, startTurn, endTurn };
    }

    
    let Square = function(square) {
        square.status = false;
        let handleEvent = () => {
            if (square.status) {
                return;
            } else if (!square.status) {
                if (playerOne.turn) {
                    playerOne.placeMarker(square);
                    playerOne.turn = playerOne.endTurn();
                    playerTwo.turn = playerTwo.startTurn();
                    currentPlayer.textContent = `${playerTwo.name}'s turn!`;
                    square.status = true;
                    game.trackTie++;
                    game.addMarkerToBoard(playerOne.marker, square.id);
                    game.checkWin(playerOne);
                } else if (playerTwo.turn) {
                    playerTwo.placeMarker(square);
                    playerTwo.turn = playerTwo.endTurn();
                    playerOne.turn = playerOne.startTurn();
                    currentPlayer.textContent = `${playerOne.name}'s turn!`;
                    square.status = true;
                    game.trackTie++;
                    game.addMarkerToBoard(playerTwo.marker, square.id);
                    game.checkWin(playerTwo);
                }
            }
        }
        square.addEventListener('click', handleEvent);
        return square;
    }

    let squareCount = 0;

    for (square of document.querySelector('.game-board').children) {
        Square(square);
        square.id = squareCount;
        squareCount++;
    }

    let game = {

        trackTie: 0,

        createPlayers() {
            if (!playerOneInput.value || !playerTwoInput.value) {
                return;
            } else {
                playerCreation.close();
                playerOne = Player(playerOneInput.value, 'X', true, 0, playerOneWinDisplay);
                playerTwo = Player(playerTwoInput.value, 'O', false, 0, playerTwoWinDisplay);
                playerOneName.textContent = playerOne.name;
                playerTwoName.textContent = playerTwo.name;
                playerOne.display.textContent = playerOne.score;
                playerOne.display.textContent = playerOne.score;
                currentPlayer.textContent = `${playerOne.name}'s turn!`;
                return (playerOne, playerTwo);
            }
        },

        checkWin(player) {
            for (let row_col_diag in gameBoard) {
                console.log(game.trackTie);
                if (gameBoard[row_col_diag].length === 3 && gameBoard[row_col_diag].every(marker => marker === player.marker)) {
                    document.querySelector('.winner').textContent = `${player.name} Wins!`;
                    document.querySelector('.current-player-turn').textContent = `${player.name} Wins!`;
                    player.score++;
                    player.display.textContent = player.score;
                    gameOverModal.showModal();
                }
                if (game.trackTie === 9) {
                    document.querySelector('.winner').textContent = 'Tie Game!';
                    document.querySelector('.current-player-turn').textContent = `Tie Game`;
                    gameOverModal.showModal();
                }
            }
        },

        addMarkerToBoard(playerMarker, squareID) {
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
        },

        restartRound() {
            gameOverModal.close();
            currentPlayer.textContent = `${playerOne.name}'s turn!`;
            playerOne.turn = playerOne.startTurn();
            playerTwo.turn = playerTwo.endTurn();
            for (let row_col_diag in gameBoard) {
                gameBoard[row_col_diag].length = 0;
            }
            for (square of document.querySelector('.game-board').children) {
                square.textContent = null;
                square.status = false;
            }
        },

        startNewGame() {
            game.restartRound();
            playerOneInput.value = '';
            playerTwoInput.value = '';
            playerOne.score = 0;
            playerTwo.score = 0;
            playerOne.display.textContent = 0;
            playerTwo.display.textContent = 0;
            playerOne = '';
            playerTwo = '';
            currentPlayer.textContent = ``;
            playerCreation.showModal();
        }
    }

    buttons.createPlayer.addEventListener('click', game.createPlayers);
    buttons.playAgain.addEventListener('click', game.restartRound);
    buttons.newGame.addEventListener('click', game.startNewGame)

    let gameOverModal = document.querySelector('.game-over-modal');


})();