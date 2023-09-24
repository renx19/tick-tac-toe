const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const squares = document.querySelectorAll(".square");
const playerXScoreDisplay = document.querySelector("#playerXScore");
const playerOScoreDisplay = document.querySelector("#playerOScore");
const resetButton = document.querySelector("#resetButton");
const newGameButton = document.querySelector("#newGameButton"); // Reference to the "New Game" button

let currentPlayer = "X";
let gameBoardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;
// Function to check for a win
// ... Rest of your code ...

// Function to check for a win
function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
            if (gameBoardState[a] === "X") {
                playerXScore++; // Increase player X's score
                playerXScoreDisplay.textContent = playerXScore; // Update the displayed score
            } else {
                playerOScore++; // Increase player O's score
                playerOScoreDisplay.textContent = playerOScore; // Update the displayed score
            }
            return true; // We have a winner
        }
    }

    return false;
}

// ... Rest of your code ...


// Function to check for a draw
function checkDraw() {
    return gameBoardState.every(cell => cell !== "");
}

// Function to handle square click
// Function to handle square click
function handleSquareClick(index) {
    if (gameBoardState[index] || !gameActive) return; // Ignore clicks on occupied squares or after the game is over

    gameBoardState[index] = currentPlayer;
    
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(currentPlayer === 'X' ? 'cross' : 'circle');
    
    squares[index].appendChild(goDisplay);
    
    if (checkWin()) {
        infoDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        infoDisplay.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        infoDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}


// Add click event listeners to squares
squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        handleSquareClick(index);
    });
});

function resetGame() {
    gameBoardState = ["", "", "", "", "", "", "", "", ""];
    squares.forEach(square => square.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    infoDisplay.textContent = "Player X's turn";
}

// Function to reset both game and scores
function newGame() {
    resetGame();
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreDisplay.textContent = playerXScore;
    playerOScoreDisplay.textContent = playerOScore;
}

// Add click event listeners to the reset button and new game button
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", newGame);