class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.cells = document.querySelectorAll('.cell');
        this.playerTurnElement = document.getElementById('playerTurn');
        this.gameMessageElement = document.getElementById('gameMessage');
        this.resetButton = document.getElementById('resetButton');
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updatePlayerTurn();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(`player-${this.currentPlayer.toLowerCase()}`);
        
        if (this.checkWin()) {
            this.gameActive = false;
            this.gameMessageElement.textContent = `Player ${this.currentPlayer} wins!`;
            this.gameMessageElement.classList.add('winner');
            this.highlightWinningCells();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.gameMessageElement.textContent = "It's a draw!";
            this.gameMessageElement.classList.add('draw');
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updatePlayerTurn();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.cells[a].classList.add('winning-cell');
                this.cells[b].classList.add('winning-cell');
                this.cells[c].classList.add('winning-cell');
            }
        });
    }
    
    updatePlayerTurn() {
        this.playerTurnElement.textContent = this.currentPlayer;
        this.playerTurnElement.className = `player-${this.currentPlayer.toLowerCase()}`;
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.gameMessageElement.textContent = '';
        this.gameMessageElement.className = '';
        this.updatePlayerTurn();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});