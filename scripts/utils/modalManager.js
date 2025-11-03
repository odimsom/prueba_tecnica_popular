class ModalManager {
    constructor() {
        this.currentModal = null;
    }

    showVictoryModal(winnerName, player1Name, player2Name, isModeCPU, scores, onNextRound, onExit) {
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content modal-defeat';
        
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-background';
        modalBg.style.backgroundImage = 'url(/assets/backgrounds/modals/square_modal_bg_large.png)';
        
        const modalIcon = document.createElement('img');
        modalIcon.src = '/assets/game_icons/modals/victory_icon_large.png';
        modalIcon.className = 'modal-icon';
        
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = 'VICTORIA';
        
        const modalSubtitle = document.createElement('p');
        modalSubtitle.className = 'modal-subtitle';
        modalSubtitle.textContent = winnerName;
        
        const getInitials = (name) => {
            return name.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase()).join('');
        };
        
        const modalScoreboard = document.createElement('div');
        modalScoreboard.className = 'modal-scoreboard';
        
        const score1 = document.createElement('div');
        score1.className = 'modal-score-item';
        const score1Initial = document.createElement('div');
        score1Initial.className = 'modal-score-initial';
        score1Initial.textContent = getInitials(player1Name);
        const score1Text = document.createElement('span');
        score1Text.textContent = `${scores.player1} GANADAS`;
        score1.appendChild(score1Initial);
        score1.appendChild(score1Text);
        
        const score2 = document.createElement('div');
        score2.className = 'modal-score-item';
        const score2Initial = document.createElement('div');
        score2Initial.className = 'modal-score-initial';
        score2Initial.textContent = isModeCPU ? 'CPU' : getInitials(player2Name);
        const score2Text = document.createElement('span');
        score2Text.textContent = `${scores.player2} GANADAS`;
        score2.appendChild(score2Initial);
        score2.appendChild(score2Text);
        
        const scoreTies = document.createElement('div');
        scoreTies.className = 'modal-score-item';
        const tiesIcon = document.createElement('img');
        tiesIcon.src = '/assets/game_icons/tie_icon.svg';
        tiesIcon.className = 'modal-ties-icon';
        const tiesText = document.createElement('span');
        tiesText.textContent = `${scores.ties} EMPATES`;
        scoreTies.appendChild(tiesIcon);
        scoreTies.appendChild(tiesText);
        
        modalScoreboard.appendChild(score1);
        modalScoreboard.appendChild(score2);
        modalScoreboard.appendChild(scoreTies);
        
        const modalButtons = document.createElement('div');
        modalButtons.className = 'modal-buttons';
        
        const exitBtn = document.createElement('button');
        exitBtn.className = 'modal-btn modal-btn-exit modal-btn-equal';
        exitBtn.textContent = 'SALIR';
        exitBtn.addEventListener('click', () => {
            this.closeModal();
            onExit();
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-btn modal-btn-next modal-btn-equal';
        nextBtn.textContent = 'PRÓXIMO ROUND';
        nextBtn.addEventListener('click', () => {
            this.closeModal();
            onNextRound();
        });
        
        modalButtons.appendChild(exitBtn);
        modalButtons.appendChild(nextBtn);
        
        modalContent.appendChild(modalBg);
        modalContent.appendChild(modalIcon);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalSubtitle);
        modalContent.appendChild(modalScoreboard);
        modalContent.appendChild(modalButtons);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this.currentModal = modal;
    }

    showDefeatModal(loserName, winnerName, player1Name, player2Name, isModeCPU, scores, onNextRound, onExit) {
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content modal-defeat';
        
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-background';
        modalBg.style.backgroundImage = 'url(/assets/backgrounds/modals/square_modal_bg_large.png)';
        
        const modalIcon = document.createElement('img');
        modalIcon.src = '/assets/game_icons/modals/defeat_icon_large.png';
        modalIcon.className = 'modal-icon modal-icon-defeat';
        
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = 'PERDISTE';
        
        const modalSubtitle = document.createElement('p');
        modalSubtitle.className = 'modal-subtitle';
        modalSubtitle.textContent = loserName;
        
        // Helper para obtener iniciales
        const getInitials = (name) => {
            return name.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase()).join('');
        };
        
        // Scoreboard dentro de la modal
        const modalScoreboard = document.createElement('div');
        modalScoreboard.className = 'modal-scoreboard';
        
        const score1 = document.createElement('div');
        score1.className = 'modal-score-item';
        const score1Initial = document.createElement('div');
        score1Initial.className = 'modal-score-initial';
        score1Initial.textContent = getInitials(player1Name);
        const score1Text = document.createElement('span');
        score1Text.textContent = `${scores.player1} GANADAS`;
        score1.appendChild(score1Initial);
        score1.appendChild(score1Text);
        
        const score2 = document.createElement('div');
        score2.className = 'modal-score-item';
        const score2Initial = document.createElement('div');
        score2Initial.className = 'modal-score-initial';
        score2Initial.textContent = isModeCPU ? 'CPU' : getInitials(player2Name);
        const score2Text = document.createElement('span');
        score2Text.textContent = `${scores.player2} GANADAS`;
        score2.appendChild(score2Initial);
        score2.appendChild(score2Text);
        
        const scoreTies = document.createElement('div');
        scoreTies.className = 'modal-score-item';
        const tiesIcon = document.createElement('img');
        tiesIcon.src = '/assets/game_icons/tie_icon.svg';
        tiesIcon.className = 'modal-ties-icon';
        const tiesText = document.createElement('span');
        tiesText.textContent = `${scores.ties} EMPATES`;
        scoreTies.appendChild(tiesIcon);
        scoreTies.appendChild(tiesText);
        
        modalScoreboard.appendChild(score1);
        modalScoreboard.appendChild(score2);
        modalScoreboard.appendChild(scoreTies);
        
        const modalButtons = document.createElement('div');
        modalButtons.className = 'modal-buttons';
        
        const exitBtn = document.createElement('button');
        exitBtn.className = 'modal-btn modal-btn-exit modal-btn-equal';
        exitBtn.textContent = 'SALIR';
        exitBtn.addEventListener('click', () => {
            this.closeModal();
            onExit();
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-btn modal-btn-next modal-btn-equal';
        nextBtn.textContent = 'PRÓXIMO ROUND';
        nextBtn.addEventListener('click', () => {
            this.closeModal();
            onNextRound();
        });
        
        modalButtons.appendChild(exitBtn);
        modalButtons.appendChild(nextBtn);
        
        modalContent.appendChild(modalBg);
        modalContent.appendChild(modalIcon);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalSubtitle);
        modalContent.appendChild(modalScoreboard);
        modalContent.appendChild(modalButtons);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this.currentModal = modal;
    }

    showTieModal(onNextRound, onExit) {
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content modal-square';
        
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-background';
        modalBg.style.backgroundImage = 'url(/assets/backgrounds/modals/square_modal_bg_large.png)';
        
        const modalIcon = document.createElement('img');
        modalIcon.src = '/assets/game_icons/tie_icon.svg';
        modalIcon.className = 'modal-icon';
        
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = 'EMPATE';
        
        const modalButtons = document.createElement('div');
        modalButtons.className = 'modal-buttons';
        
        const exitBtn = document.createElement('button');
        exitBtn.className = 'modal-btn modal-btn-exit';
        exitBtn.textContent = 'SALIR';
        exitBtn.addEventListener('click', () => {
            this.closeModal();
            onExit();
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-btn modal-btn-next';
        nextBtn.textContent = 'PRÓXIMO ROUND';
        nextBtn.addEventListener('click', () => {
            this.closeModal();
            onNextRound();
        });
        
        modalButtons.appendChild(exitBtn);
        modalButtons.appendChild(nextBtn);
        
        modalContent.appendChild(modalBg);
        modalContent.appendChild(modalIcon);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalButtons);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this.currentModal = modal;
    }

    showRestartModal(onConfirm, onCancel) {
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content modal-rectangle';
        
        const modalBg = document.createElement('div');
        modalBg.className = 'modal-background';
        modalBg.style.backgroundImage = 'url(/assets/backgrounds/modals/rectangle_modal_bg_large.png)';
        
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = '¿Seguro que desea';
        
        const modalTitle2 = document.createElement('h2');
        modalTitle2.className = 'modal-title';
        modalTitle2.textContent = 'reiniciar la partida?';
        
        const modalButtons = document.createElement('div');
        modalButtons.className = 'modal-buttons';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'modal-btn modal-btn-exit modal-btn-equal';
        cancelBtn.textContent = 'CANCELAR';
        cancelBtn.addEventListener('click', () => {
            this.closeModal();
            onCancel();
        });
        
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'modal-btn modal-btn-next modal-btn-equal';
        confirmBtn.textContent = 'REINICIAR PARTIDA';
        confirmBtn.addEventListener('click', () => {
            this.closeModal();
            onConfirm();
        });
        
        modalButtons.appendChild(cancelBtn);
        modalButtons.appendChild(confirmBtn);
        
        modalContent.appendChild(modalBg);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalTitle2);
        modalContent.appendChild(modalButtons);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this.currentModal = modal;
    }

showHistoryModal(currentPlayer, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const playerHistory = historyManager.getPlayerHistory(currentPlayer);
    
    const historyItems = playerHistory.length > 0 
        ? playerHistory.map((match, index) => {
            const isPlayer1 = match.player1 === currentPlayer;
            const opponent = isPlayer1 ? match.player2 : match.player1;
            let resultText = '';
            let resultIcon = '';
            
            if (match.winner === 'tie') {
                resultText = 'EMPATE';
                resultIcon = '⚖️';
            } else if ((isPlayer1 && match.winner === match.player1) || (!isPlayer1 && match.winner === match.player2)) {
                resultText = 'VICTORIA';
                resultIcon = '🏆';
            } else {
                resultText = 'DERROTA';
                resultIcon = '😔';
            }
            
            const date = new Date(match.date);
            const formattedDate = date.toLocaleDateString('es-ES', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric'
            });
            
            return `
                <div class="history-game-item" style="animation-delay: ${index * 0.05}s">
                    <span class="history-game-icon">${resultIcon}</span>
                    <div class="history-game-info">
                        <span class="history-game-vs">${currentPlayer} vs ${opponent}</span>
                        <span class="history-game-result">${resultText}</span>
                    </div>
                    <span class="history-game-date">${formattedDate}</span>
                </div>
            `;
        }).join('')
        : '<div class="history-empty-state"><span class="history-empty-icon">📊</span><p>No hay partidas registradas</p></div>';
    
    modal.innerHTML = `
        <div class="modal-content modal-history">
            <div class="modal-background" style="background-image: url('./assets/backgrounds/modals/square_modal_bg_large.png');"></div>
            <h2 class="modal-title">HISTORIAL</h2>
            <p class="modal-subtitle">${currentPlayer}</p>
            <div class="modal-history-container">
                ${historyItems}
            </div>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-exit modal-btn-equal">CERRAR</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-btn-exit');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        callback();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            callback();
        }
    });
    
    if (typeof AnimationManager !== 'undefined') {
        AnimationManager.addRippleEffect(closeBtn);
    }
}    closeModal() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
        }
    }
}

const modalManager = new ModalManager();
