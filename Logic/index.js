const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const modeBtn = document.getElementById('mode-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isSinglePlayer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellPlayed(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        statusDisplay.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (isSinglePlayer && gameActive && currentPlayer === 'O') {
        setTimeout(computerPlay, 500);
    }
}

function computerPlay() {
    let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(item => item !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    let computerCell = document.querySelector(`.cell[data-index='${randomIndex}']`);

    handleCellPlayed(computerCell, randomIndex);
    handleResultValidation();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = '');
}

function toggleMode() {
    isSinglePlayer = !isSinglePlayer;
    modeBtn.textContent = isSinglePlayer ? 'Switch to 2-Player Mode' : 'Switch to 1-Player Mode';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modeBtn.addEventListener('click', toggleMode);

resetGame();
