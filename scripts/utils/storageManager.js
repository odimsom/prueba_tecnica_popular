class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'tictactoe_game_state';
    }

    saveGameState(game) {
        const state = {
            mode: game.mode,
            player1: game.player1,
            player2: game.player2,
            board: game.board,
            currentPlayer: game.currentPlayer,
            gameOver: game.gameOver,
            scores: game.scores,
            player1Symbol: game.player1Symbol,
            player2Symbol: game.player2Symbol,
            timestamp: Date.now()
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }

    updateSymbols(player1Symbol, player2Symbol) {
        const saved = this.loadGameState();
        if (saved) {
            saved.player1Symbol = player1Symbol;
            saved.player2Symbol = player2Symbol;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saved));
        }
    }

    loadGameState() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    clearGameState() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    hasGameState() {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }

    savePlayerStats(playerName, stats) {
        const key = `player_${playerName}`;
        const existing = this.getPlayerStats(playerName);
        
        const updated = {
            name: playerName,
            wins: (existing?.wins || 0) + (stats.wins || 0),
            losses: (existing?.losses || 0) + (stats.losses || 0),
            ties: (existing?.ties || 0) + (stats.ties || 0),
            lastPlayed: Date.now()
        };
        
        localStorage.setItem(key, JSON.stringify(updated));
    }

    getPlayerStats(playerName) {
        const key = `player_${playerName}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    }

    updatePlayerStats(player1Name, player2Name, winner) {
        if (winner === 'tie') {
            this.savePlayerStats(player1Name, { ties: 1 });
            if (player2Name !== 'CPU') {
                this.savePlayerStats(player2Name, { ties: 1 });
            }
        } else if (winner === player1Name) {
            this.savePlayerStats(player1Name, { wins: 1 });
            if (player2Name !== 'CPU') {
                this.savePlayerStats(player2Name, { losses: 1 });
            }
        } else {
            this.savePlayerStats(player1Name, { losses: 1 });
            if (player2Name !== 'CPU') {
                this.savePlayerStats(player2Name, { wins: 1 });
            }
        }
    }
}

const storageManager = new StorageManager();
