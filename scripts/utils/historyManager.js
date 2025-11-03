class HistoryManager {
    constructor() {
        this.HISTORY_KEY = 'tictactoe_history';
    }

    addMatch(matchData) {
        const history = this.getHistory();
        const match = {
            id: Date.now(),
            date: new Date().toISOString(),
            player1: matchData.player1,
            player2: matchData.player2,
            winner: matchData.winner,
            mode: matchData.mode,
            player1Symbol: matchData.player1Symbol,
            player2Symbol: matchData.player2Symbol,
            finalScores: matchData.scores
        };
        
        history.unshift(match);
        
        if (history.length > 50) {
            history.pop();
        }
        
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    }

    getHistory() {
        const saved = localStorage.getItem(this.HISTORY_KEY);
        return saved ? JSON.parse(saved) : [];
    }

    clearHistory() {
        localStorage.removeItem(this.HISTORY_KEY);
    }

    getStats() {
        const history = this.getHistory();
        return {
            totalMatches: history.length,
            wins: history.filter(m => m.winner !== 'tie').length,
            ties: history.filter(m => m.winner === 'tie').length
        };
    }
}

const historyManager = {
    addMatch(matchData) {
        const player1History = this.getPlayerHistory(matchData.player1);
        const player2History = this.getPlayerHistory(matchData.player2);
        
        const match = {
            ...matchData,
            date: new Date().toISOString(),
            id: Date.now()
        };
        
        player1History.push(match);
        player2History.push(match);
        
        this.savePlayerHistory(matchData.player1, player1History);
        this.savePlayerHistory(matchData.player2, player2History);
    },

    getPlayerHistory(playerName) {
        const key = `history_${playerName}`;
        const history = localStorage.getItem(key);
        return history ? JSON.parse(history) : [];
    },

    savePlayerHistory(playerName, history) {
        const key = `history_${playerName}`;
        localStorage.setItem(key, JSON.stringify(history));
    },

    clearPlayerHistory(playerName) {
        const key = `history_${playerName}`;
        localStorage.removeItem(key);
    },

    getAllHistory() {
        const allHistory = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('history_')) {
                const history = JSON.parse(localStorage.getItem(key));
                allHistory.push(...history);
            }
        }
        return allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
};
