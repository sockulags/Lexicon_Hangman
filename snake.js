class Snake {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.gameMessageElement = document.getElementById('gameMessage');
        this.startButton = document.getElementById('startButton');
        this.pauseButton = document.getElementById('pauseButton');
        
        // Game constants
        this.gridSize = 20;
        this.gridCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.direction = {x: 0, y: 0};
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.waitingForFirstMove = false;
        this.gameLoop = null;
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.pauseButton.addEventListener('click', () => this.togglePause());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        this.drawGame();
        this.updateMessage('Press Start Game and use arrow keys to control the snake');
    }
    
    startGame() {
        if (this.gameRunning && !this.gamePaused) {
            this.resetGame();
            return;
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.startButton.textContent = 'Reset Game';
        this.pauseButton.style.display = 'inline-block';
        this.pauseButton.textContent = 'Pause';
        this.updateMessage('Use arrow keys to start moving the snake');
        
        // Don't start the game loop until player presses an arrow key
        this.waitingForFirstMove = true;
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            clearInterval(this.gameLoop);
            this.pauseButton.textContent = 'Resume';
            this.updateMessage('Game Paused - Click Resume to continue');
        } else {
            this.gameLoop = setInterval(() => this.update(), 150);
            this.pauseButton.textContent = 'Pause';
            this.updateMessage('Use arrow keys to control the snake');
        }
    }
    
    resetGame() {
        clearInterval(this.gameLoop);
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 0, y: 0};
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.waitingForFirstMove = false;
        this.startButton.textContent = 'Start Game';
        this.pauseButton.style.display = 'none';
        this.generateFood();
        this.updateScore();
        this.drawGame();
        this.updateMessage('Press Start Game and use arrow keys to control the snake');
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const key = e.key;
        
        // Prevent default behavior for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
        }
        
        // Only allow direction change if it's not opposite to current direction
        let newDirection = null;
        switch (key) {
            case 'ArrowUp':
                if (this.direction.y === 0) {
                    newDirection = {x: 0, y: -1};
                }
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) {
                    newDirection = {x: 0, y: 1};
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) {
                    newDirection = {x: -1, y: 0};
                }
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) {
                    newDirection = {x: 1, y: 0};
                }
                break;
        }
        
        if (newDirection) {
            this.direction = newDirection;
            // Start the game loop on first move
            if (this.waitingForFirstMove) {
                this.waitingForFirstMove = false;
                this.updateMessage('Snake is moving! Use arrow keys to control direction');
                this.gameLoop = setInterval(() => this.update(), 150);
            }
        }
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused || this.waitingForFirstMove) return;
        
        // Calculate new head position
        const head = {x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y};
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.gridCount || head.y < 0 || head.y >= this.gridCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.generateFood();
        } else {
            this.snake.pop();
        }
        
        this.drawGame();
    }
    
    generateFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.gridCount),
                y: Math.floor(Math.random() * this.gridCount)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }
    
    drawGame() {
        // Clear canvas
        this.ctx.fillStyle = '#2a2a2a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#4CAF50';
        this.snake.forEach((segment, index) => {
            // Make head slightly different color
            if (index === 0) {
                this.ctx.fillStyle = '#45a049';
            } else {
                this.ctx.fillStyle = '#4CAF50';
            }
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff4757';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
        
        // Draw grid lines (optional, for better visibility)
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.gridCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    gameOver() {
        clearInterval(this.gameLoop);
        this.gameRunning = false;
        this.startButton.textContent = 'Start Game';
        this.pauseButton.style.display = 'none';
        this.updateMessage(`Game Over! Final Score: ${this.score}. Click Start Game to play again.`);
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    updateMessage(message) {
        this.gameMessageElement.textContent = message;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Snake();
});