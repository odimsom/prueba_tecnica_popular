class TicTacToeGame {
    constructor(mode, player1, player2) {
        this.mode = mode;
        this.player1 = player1;
        this.player2 = player2;
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.scores = {
            player1: 0,
            player2: 0,
            ties: 0
        };
        this.player1Symbol = 'X';
        this.player2Symbol = 'O';
    }

    assignSymbols() {
        const random = Math.random() < 0.5;
        this.player1Symbol = random ? 'X' : 'O';
        this.player2Symbol = random ? 'O' : 'X';
        this.currentPlayer = 'X';
    }

    switchSymbols() {
        const temp = this.player1Symbol;
        this.player1Symbol = this.player2Symbol;
        this.player2Symbol = temp;
        
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        storageManager.saveGameState(this);
    }

    makeMove(index) {
        if (this.board[index] || this.gameOver) return false;

        this.board[index] = this.currentPlayer;
        
        if (typeof AudioManager !== 'undefined') {
            AudioManager.playSound('place');
        }
        
        storageManager.saveGameState(this);
        
        if (this.checkWinner(this.currentPlayer)) {
            this.gameOver = true;
            this.updateScores(this.currentPlayer);
            
            if (typeof AudioManager !== 'undefined') {
                AudioManager.playSound('win');
            }
            
            const winner = this.currentPlayer === this.player1Symbol ? this.player1 : this.player2;
            storageManager.updatePlayerStats(this.player1, this.player2, winner);
            
            return { winner: this.getCurrentPlayerName(), type: 'win' };
        }

        if (this.isBoardFull()) {
            this.gameOver = true;
            this.scores.ties++;
            
            if (typeof AudioManager !== 'undefined') {
                AudioManager.playSound('draw');
            }
            
            storageManager.updatePlayerStats(this.player1, this.player2, 'tie');
            
            return { winner: null, type: 'tie' };
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return true;
    }

    getAIMove() {
        const aiSymbol = this.player2Symbol;
        const humanSymbol = this.player1Symbol;
        
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = aiSymbol;
                let score = this.minimax(this.board, 0, false, -Infinity, Infinity, aiSymbol, humanSymbol);
                this.board[i] = null;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing, alpha, beta, aiSymbol, humanSymbol) {
        if (this.checkWinner(aiSymbol)) return 10 - depth;
        if (this.checkWinner(humanSymbol)) return depth - 10;
        if (this.isBoardFull()) return 0;

        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = aiSymbol;
                    let score = this.minimax(board, depth + 1, false, alpha, beta, aiSymbol, humanSymbol);
                    board[i] = null;
                    maxScore = Math.max(score, maxScore);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) break;
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = humanSymbol;
                    let score = this.minimax(board, depth + 1, true, alpha, beta, aiSymbol, humanSymbol);
                    board[i] = null;
                    minScore = Math.min(score, minScore);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) break;
                }
            }
            return minScore;
        }
    }

    checkWinner(symbol) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => this.board[index] === symbol)
        );
    }

    isBoardFull() {
        return this.board.every(cell => cell !== null);
    }

    updateScores(winner) {
        if (winner === this.player1Symbol) {
            this.scores.player1++;
        } else {
            this.scores.player2++;
        }
    }

    getCurrentPlayerName() {
        if (this.currentPlayer === this.player1Symbol) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    isPlayerTurn() {
        return this.currentPlayer === this.player1Symbol;
    }

    resetBoard() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        storageManager.saveGameState(this);
        
        if (typeof AudioManager !== 'undefined') {
            setTimeout(() => {
                AudioManager.playSound('start');
            }, 300);
        }
    }

    resetGame() {
        this.resetBoard();
        this.scores = {
            player1: 0,
            player2: 0,
            ties: 0
        };
        
        storageManager.clearGameState();
        
        if (typeof AudioManager !== 'undefined') {
            setTimeout(() => {
                AudioManager.playSound('start');
            }, 300);
        }
    }
}
