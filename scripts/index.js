window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = createLoadingScreen(() => {
        showSelectMode();
    });
    
    screenManager.show(loadingScreen);
});

function showSelectMode() {
    const selectModeScreen = createSelectModeScreen((mode) => {
        screenManager.transition(createNameFormScreen(mode, (names) => {
            startGame(names);
        }));
    });
    
    screenManager.show(selectModeScreen);
}

function startGame(gameData) {
    const gameScreen = createGameScreen(gameData);
    screenManager.transition(gameScreen);
    
    if (typeof AudioManager !== 'undefined') {
        setTimeout(() => {
            AudioManager.playSound('start');
        }, 500);
    }
}
    
    if (typeof AudioManager !== 'undefined') {
        setTimeout(() => {
            AudioManager.playSound('start');
        }, 500);
    }


function setupAudioControls() {
    if (typeof AudioManager === 'undefined') {
        return;
    }

    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button id="musicToggle" class="audio-btn pulse" title="Música - Haz clic para activar">
            <span class="icon">${AudioManager.isMusicEnabled() ? '🔊' : '🔇'}</span>
            <span class="label">Música</span>
        </button>
        <button id="sfxToggle" class="audio-btn" title="Efectos de sonido">
            <span class="icon">${AudioManager.isSFXEnabled() ? '🔔' : '🔕'}</span>
            <span class="label">Efectos</span>
        </button>
    `;
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.insertBefore(audioControls, gameContainer.firstChild);
    }

    setTimeout(() => {
        const musicBtn = document.getElementById('musicToggle');
        const sfxBtn = document.getElementById('sfxToggle');
        
        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                musicBtn.classList.remove('pulse');
                
                const enabled = AudioManager.toggleMusic();
                const icon = document.querySelector('#musicToggle .icon');
                if (icon) icon.textContent = enabled ? '🔊' : '🔇';
                
                setTimeout(() => {
                    if (AudioManager.isSFXEnabled()) {
                        AudioManager.playSound('click');
                    }
                }, 100);
            });
        }

        if (sfxBtn) {
            sfxBtn.addEventListener('click', () => {
                const wasSfxEnabled = AudioManager.isSFXEnabled();
                const enabled = AudioManager.toggleSFX();
                const icon = document.querySelector('#sfxToggle .icon');
                if (icon) icon.textContent = enabled ? '🔔' : '🔕';
                
                if (wasSfxEnabled) {
                    setTimeout(() => AudioManager.playSound('click'), 50);
                }
            });
        }
    }, 100);
}

if (typeof AudioManager !== 'undefined') {
    AudioManager.init();
    
    let audioStarted = false;
    
    const showAudioPermissionModal = () => {
        const modal = document.createElement('div');
        modal.className = 'audio-permission-modal';
        modal.innerHTML = `
            <div class="audio-permission-content">
                <div class="audio-permission-icon">🎵</div>
                <h2>¡BIENVENIDO!</h2>
                <p>Este juego incluye música y efectos de sonido</p>
                <p class="audio-permission-subtitle">¿Deseas activar el audio?</p>
                <div class="audio-permission-buttons">
                    <button class="audio-permission-btn accept">SÍ, ACTIVAR AUDIO</button>
                    <button class="audio-permission-btn decline">NO, JUGAR EN SILENCIO</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const acceptBtn = modal.querySelector('.accept');
        const declineBtn = modal.querySelector('.decline');
        
        const startAudio = (enableAudio) => {
            audioStarted = true;
            if (enableAudio) {
                AudioManager.playMusic();
            } else {
                AudioManager.musicEnabled = false;
                AudioManager.sfxEnabled = false;
            }
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        };
        
        acceptBtn.addEventListener('click', () => startAudio(true));
        declineBtn.addEventListener('click', () => startAudio(false));
    };
    
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(showAudioPermissionModal, 500);
    });
}

if (typeof AnimationManager !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            AnimationManager.addRippleEffect(button);
        });
    });
}

addClickSoundToButtons();

function addClickSoundToButtons() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, .clickable');
        if (target && typeof AudioManager !== 'undefined') {
            AudioManager.playSound('click');
        }
    }, true);
}

const Game = {
    makeMove(row, col) {
        if (this.board[row][col] !== '' || this.gameOver) {
            return false;
        }

        this.board[row][col] = this.currentPlayer;
        this.movesCount++;
        
        if (typeof AudioManager !== 'undefined' && AudioManager.playSound) {
            AudioManager.playSound('place');
        }

        return true;
    },

    endGame(winner) {
        this.gameOver = true;
        this.winner = winner;
        
        if (typeof AudioManager !== 'undefined' && AudioManager.playSound) {
            if (winner === 'draw') {
                AudioManager.playSound('draw');
            } else {
                AudioManager.playSound('win');
            }
        }
        
        this.updateStats(winner);
    },
};