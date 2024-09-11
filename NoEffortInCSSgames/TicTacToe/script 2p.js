// Initialize the game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Function to handle a move
function makeMove(index) {
    if (board[index] === '') { // Check if the cell is empty
        board[index] = currentPlayer; // Update the board
        document.querySelectorAll('.cell')[index].innerText = currentPlayer; // Update the cell display
        
        // Set a timeout to check for a winner after a short delay
        setTimeout(() => {
            checkWinner(); // Check if there's a winner after the move
        }, 100); // 100 milliseconds delay
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
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
            alert(`Player ${board[a]} wins!`);
            resetGame(); // Reset the game after a win
            return;
        }
    }

    if (!board.includes('')) { // Check for a draw
        alert("It's a draw!");
        resetGame(); // Reset the game after a draw
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = ''); // Clear the cells
    currentPlayer = 'X'; // Reset the current player
}
