// Initialize the game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player starts as 'X'
let isGameActive = true; // Track if the game is active

// Function to handle a move
function makeMove(index) {
    if (isGameActive && board[index] === '') { // Check if the game is active and cell is empty
        board[index] = currentPlayer; // Update the board
        document.querySelectorAll('.cell')[index].innerText = currentPlayer; // Update the cell display
        if (checkWinner()) { // Check if there's a winner
            isGameActive = false; // Stop the game if there's a winner
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        if (currentPlayer === 'O') { // If it's the computer's turn
            setTimeout(computerMove, 500); // Wait before computer moves
        }
    }
}

// Function to handle the computer's move
function computerMove() {
    let emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = currentPlayer; // Computer makes a move
        document.querySelectorAll('.cell')[randomIndex].innerText = currentPlayer; // Update the cell display
        if (checkWinner()) { // Check if there's a winner
            isGameActive = false; // Stop the game if there's a winner
        } else {
            currentPlayer = 'X'; // Switch back to player
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setTimeout(() => alert(`Player ${board[a]} wins!`), 100); // Delay alert to ensure move is visible
            return true;
        }
    }

    if (!board.includes('')) { // Check for a draw
        setTimeout(() => alert("It's a draw!"), 100); // Delay alert to ensure board is updated
        return true;
    }

    return false;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = ''); // Clear the cells
    currentPlayer = 'X'; // Reset the current player
    isGameActive = true; // Set the game as active
}
