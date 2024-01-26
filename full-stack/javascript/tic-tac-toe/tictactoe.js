//1. create gameboard as an array inside of a Gameboard object
//players will be stored in objects

//create the object through a module pattern
const gameBoard = (function () {
    'use strict';

    //fill in the array
    const boardArray = [];

    return { boardArray };
})();


//create a factory function instance for the player
const playerFactory = (name) => {
    return { name };
};

//module pattern for the game flow
const game = (function () {
    'use strict';

    const gridContainer = document.getElementById("grid-container")
    const playerXInput = document.getElementById("player-x-input");
    const playerOInput = document.getElementById("player-o-input");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = 'X';

    //players
    let playerX = playerFactory("Player X");
    let playerO = playerFactory("Player O");

    playerXInput.addEventListener('input', function () {
        playerX.name = playerXInput.value;
    });

    playerOInput.addEventListener('input', function () {
        playerO.name = playerOInput.value;
    });

    resetButton.addEventListener('click', function () {
        startGame();
    })

    //create an array that has all the winning combinations
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    //3. loop through winCombinations and check for each combination
    function checkWin(player) {
        for (const combination of winCombinations) {
            //extract values from combination through destructuring
            const [a, b, c] = combination; //set combination
            //a = combination[0], b = combination[1], and so on
            if ( //check if the combination matches the player/marker
                gameBoard.boardArray[a] === player &&
                gameBoard.boardArray[b] === player &&
                gameBoard.boardArray[c] === player
            ) {
                return true; //victory
            }
        }
    }

    //render the elements
    function createCells() {
        const cellElement = document.createElement("div");
        gridContainer.appendChild(cellElement);
        cellElement.addEventListener('click', function() {
            //suppose we haven't met the winning combination yet
            if (!checkWin(currentPlayer)) {
                //set cell to currentPlayer
                //cells behave normally and take in markers
                cellElement.textContent = currentPlayer;
                gameBoard.boardArray[cellElement.dataset.index] = currentPlayer;

                if (checkWin(currentPlayer)) {
                    const winText = document.createElement("h3");
                    winText.textContent = `${currentPlayer === 'X' ? playerX.name : playerO.name} wins!`;
                    winText.id = "win-text";
                    document.body.appendChild(winText);
                } else {
                    //if X then switch to O, if not then X
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }

        });
    }

    function startGame() {

        //reset player
        currentPlayer = 'X';
        //reset array
        gameBoard.boardArray = [];
        //reset/clear the grid every time
        gridContainer.innerHTML = '';
    
        //3x3 grid with boxes
        for(let i = 0; i < 9; i++) {
            createCells();
            gridContainer.children[i].setAttribute('data-index', i);
            }
    
        }

        return { startGame };

})();

game.startGame();