// Initialize a 9x9 Sudoku board with empty cells
let board = Array(9).fill(null).map(() => Array(9).fill(''));

// Function to generate a random number between 1 and 9
function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

// Function to check if a number can be placed at a given position
function isValid(board, row, col, num) {
    // Check the row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) {
            return false;
        }
    }

    // Check the 3x3 sub-grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] == num) {
                return false;
            }
        }
    }

    return true;
}

// Function to fill random cells in the grid
function fillRandomCells(board) {
    let count = 20; // Number of cells to fill randomly
    while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const num = getRandomNumber();
        
        if (board[row][col] === '' && isValid(board, row, col, num)) {
            board[row][col] = num;
            count--;
        }
    }
}

// Function to display the Sudoku board in the HTML
function displayBoard() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = board[row][col];
            cell.onclick = () => handleCellClick(row, col);
            grid.appendChild(cell);
        }
    }
}

// Function to handle cell click events
function handleCellClick(row, col) {
    const num = prompt('Enter a number (1-9):');
    if (num >= 1 && num <= 9 && isValid(board, row, col, num)) {
        board[row][col] = num;
        displayBoard();
        if (isSudokuSolved()) {
            alert('Congratulations! You have solved the Sudoku correctly.');
        }
    } else {
        alert('Invalid number or placement. Try again.');
    }
}

// Function to check if the Sudoku is solved correctly
function isSudokuSolved() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '' || !isValid(board, row, col, board[row][col])) {
                return false;
            }
        }
    }
    return true;
}

// Function to solve the Sudoku (Auto Complete)
function autoComplete() {
    if (solveSudoku(board, 0, 0)) {
        setTimeout(() => {
            displayBoard(); // Ensure the board is displayed first
            alert('Seems like a skill issue, anyway I solved it!'); // Show a message after displaying the board
        }, 100); // 100 milliseconds delay to allow the board to update
    } else {
        alert("No solution exists!");
    }
}



// Function to solve Sudoku using backtracking
function solveSudoku(board, row, col) {
    if (row === 9) return true; // If we reached the end, the board is solved
    if (col === 9) return solveSudoku(board, row + 1, 0); // Move to the next row
    if (board[row][col] !== '') return solveSudoku(board, row, col + 1); // Skip filled cells

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num; // Place number
            if (solveSudoku(board, row, col + 1)) return true; // Recursively solve for the next cell
            board[row][col] = ''; // Undo move if it leads to no solution
        }
    }

    return false; // Trigger backtracking
}

// Initialize the board and display it
fillRandomCells(board);
displayBoard();
