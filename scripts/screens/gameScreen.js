function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase())
        .join('');
}

function createGameScreen(gameData) {
    const game = new TicTacToeGame(gameData.mode, gameData.player1, gameData.player2);
    
    if (!game || !game.board) {
        return document.createElement('div');
    }
    
    const screen = document.createElement('div');
    screen.className = 'game-container';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    const backIcon = document.createElement('img');
    backIcon.src = '/assets/game_icons/back_icon.svg';
    backIcon.alt = 'Regresar';
    backBtn.appendChild(backIcon);
    backBtn.addEventListener('click', () => {
        if (confirm('¿Deseas salir del juego?')) {
            const selectModeScreen = createSelectModeScreen((mode) => {
                screenManager.transition(createNameFormScreen(mode, (names) => {
                    startGame(names);
                }));
            });
            screenManager.transition(selectModeScreen);
        }
    });

    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn';
    const restartIcon = document.createElement('img');
    restartIcon.src = '/assets/game_icons/rollback_icon.svg';
    restartIcon.alt = 'Reiniciar';
    restartBtn.appendChild(restartIcon);
    restartBtn.addEventListener('click', () => {
        modalManager.showRestartModal(
            () => {
                game.resetBoard();
                updateBoard();
                updateScoreboard();
                checkAIFirstMove();
            },
            () => {}
        );
    });

    const playersSection = document.createElement('div');
    playersSection.className = 'players-section';

    const player1Container = document.createElement('div');
    player1Container.className = 'player-container player-1';

    const player1Name = document.createElement('div');
    player1Name.className = 'player-name';
    player1Name.textContent = gameData.player1;

    const player1Avatar = document.createElement('div');
    player1Avatar.className = 'player-avatar';
    const player1Initial = document.createElement('span');
    player1Initial.textContent = getInitials(gameData.player1);
    player1Avatar.appendChild(player1Initial);
    const player1Mark = document.createElement('img');
    player1Mark.src = '/assets/game_icons/player_icon_x.svg';
    player1Mark.className = 'player-mark';
    player1Avatar.appendChild(player1Mark);

    player1Container.appendChild(player1Name);
    player1Container.appendChild(player1Avatar);

    const vsContainer = document.createElement('div');
    vsContainer.className = 'vs-container';
    vsContainer.textContent = 'VS';

    const player2Container = document.createElement('div');
    player2Container.className = 'player-container player-2';

    const player2Name = document.createElement('div');
    player2Name.className = 'player-name';
    player2Name.textContent = gameData.player2;

    const player2Avatar = document.createElement('div');
    player2Avatar.className = 'player-avatar';
    
    if (gameData.mode === 'cpu') {
        const cpuText = document.createElement('span');
        cpuText.textContent = 'CPU';
        player2Avatar.appendChild(cpuText);
    } else {
        const player2Initial = document.createElement('span');
        player2Initial.textContent = getInitials(gameData.player2);
        player2Avatar.appendChild(player2Initial);
    }
    
    const player2Mark = document.createElement('img');
    player2Mark.src = '/assets/game_icons/player_icon_o.svg';
    player2Mark.className = 'player-mark';
    player2Avatar.appendChild(player2Mark);

    player2Container.appendChild(player2Name);
    player2Container.appendChild(player2Avatar);

    playersSection.appendChild(player1Container);
    playersSection.appendChild(vsContainer);
    playersSection.appendChild(player2Container);

    const gameBoardSection = document.createElement('div');
    gameBoardSection.className = 'game-board-section';

    const actionsPanel = document.createElement('div');
    actionsPanel.className = 'game-actions-panel';

    const switchSymbolsBtn = document.createElement('button');
    switchSymbolsBtn.className = 'switch-symbols-btn';
    switchSymbolsBtn.innerHTML = '⇄';
    switchSymbolsBtn.title = 'Cambiar símbolos';
    switchSymbolsBtn.addEventListener('click', () => {
        game.switchSymbols();
        updatePlayerSymbols();
        updateBoard();
        updateScoreboard();
        checkAIFirstMove();
    });

    const musicBtn = document.createElement('button');
    musicBtn.className = 'action-btn';
    musicBtn.title = 'Música de fondo';
    musicBtn.classList.toggle('inactive', !AudioManager.isMusicEnabled());
    
    const musicIcon = document.createElement('img');
    musicIcon.src = '/assets/game_icons/music_icon.png';
    musicBtn.appendChild(musicIcon);
    
    musicBtn.addEventListener('click', () => {
        const enabled = AudioManager.toggleMusic();
        musicBtn.classList.toggle('inactive', !enabled);
    });

    const sfxBtn = document.createElement('button');
    sfxBtn.className = 'action-btn';
    sfxBtn.title = 'Efectos de sonido';
    sfxBtn.classList.toggle('inactive', !AudioManager.isSFXEnabled());
    
    const sfxIcon = document.createElement('img');
    sfxIcon.src = '/assets/game_icons/sound_icon.png';
    sfxBtn.appendChild(sfxIcon);
    
    sfxBtn.addEventListener('click', () => {
        const enabled = AudioManager.toggleSFX();
        sfxBtn.classList.toggle('inactive', !enabled);
    });

    const historyBtn = document.createElement('button');
    historyBtn.className = 'action-btn';
    historyBtn.title = 'Historial';
    
    const historyIcon = document.createElement('img');
    historyIcon.src = '/assets/game_icons/history_icon.png';
    historyBtn.appendChild(historyIcon);
    
    historyBtn.addEventListener('click', () => {
        modalManager.showHistoryModal(game.player1, () => {});
    });

    actionsPanel.appendChild(switchSymbolsBtn);
    actionsPanel.appendChild(musicBtn);
    actionsPanel.appendChild(sfxBtn);
    actionsPanel.appendChild(historyBtn);

    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.className = 'game-board-container';

    const scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';

    const score1 = document.createElement('div');
    score1.className = 'score-item';
    const score1Initial = document.createElement('div');
    score1Initial.className = 'score-initial';
    score1Initial.textContent = getInitials(gameData.player1);
    const score1Wins = document.createElement('div');
    score1Wins.className = 'score-wins';
    score1Wins.textContent = '0 GANADAS';
    score1.appendChild(score1Initial);
    score1.appendChild(score1Wins);

    const score2 = document.createElement('div');
    score2.className = 'score-item';
    const score2Initial = document.createElement('div');
    score2Initial.className = 'score-initial';
    score2Initial.textContent = gameData.mode === 'cpu' ? 'CPU' : getInitials(gameData.player2);
    const score2Wins = document.createElement('div');
    score2Wins.className = 'score-wins';
    score2Wins.textContent = '0 GANADAS';
    score2.appendChild(score2Initial);
    score2.appendChild(score2Wins);

    const scoreTies = document.createElement('div');
    scoreTies.className = 'score-item score-ties';
    const tiesIcon = document.createElement('img');
    tiesIcon.src = '/assets/game_icons/tie_icon.svg';
    tiesIcon.alt = 'Empates';
    const tiesCount = document.createElement('div');
    tiesCount.className = 'score-wins';
    tiesCount.textContent = '0 EMPATES';
    scoreTies.appendChild(tiesIcon);
    scoreTies.appendChild(tiesCount);

    scoreboard.appendChild(score1);
    scoreboard.appendChild(score2);
    scoreboard.appendChild(scoreTies);

    const board = document.createElement('div');
    board.className = 'game-board';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    gameBoardContainer.appendChild(scoreboard);
    gameBoardContainer.appendChild(board);
    
    gameBoardSection.appendChild(actionsPanel);
    gameBoardSection.appendChild(gameBoardContainer);

    screen.appendChild(backBtn);
    screen.appendChild(restartBtn);
    screen.appendChild(playersSection);
    screen.appendChild(gameBoardSection);

    function updateBoard() {
        const cells = board.querySelectorAll('.game-cell');
        cells.forEach((cell, index) => {
            cell.innerHTML = '';
            cell.classList.remove('disabled');
            
            if (game.board[index]) {
                const icon = document.createElement('img');
                icon.src = game.board[index] === 'X' 
                    ? '/assets/game_icons/move_icon_x.svg' 
                    : '/assets/game_icons/move_icon_o.svg';
                cell.appendChild(icon);
                cell.classList.add('disabled');
            }
        });
    }

    function updateScoreboard() {
        score1Wins.textContent = `${game.scores.player1} GANADAS`;
        score2Wins.textContent = `${game.scores.player2} GANADAS`;
        tiesCount.textContent = `${game.scores.ties} EMPATES`;
    }

    function updatePlayerSymbols() {
        player1Mark.src = game.player1Symbol === 'X' 
            ? '/assets/game_icons/player_icon_x.svg' 
            : '/assets/game_icons/player_icon_o.svg';
        
        player2Mark.src = game.player2Symbol === 'X' 
            ? '/assets/game_icons/player_icon_x.svg' 
            : '/assets/game_icons/player_icon_o.svg';
    }

    function handleCellClick(index) {
        if (!game || !game.board || game.gameOver || game.board[index]) return;

        if (game.mode === 'cpu' && !game.isPlayerTurn()) return;

        const result = game.makeMove(index);
        updateBoard();
        updateScoreboard();

        const winner = game.checkWinner();
        if (winner) {
            setTimeout(() => {
                if (winner === 'draw') {
                    showDrawModal(game, () => {
                        game.resetBoard();
                        updateBoard();
                        updateScoreboard();
                    }, () => {
                        screen.remove();
                        const selectModeScreen = createSelectModeScreen((mode) => {
                            screenManager.transition(createNameFormScreen(mode, (names) => {
                                startGame(names);
                            }));
                        });
                        screenManager.transition(selectModeScreen);
                    });
                } else {
                    const winnerName = winner === 'X' ? game.player1 : (game.mode === 'cpu' ? 'CPU' : game.player2);
                    const isPlayer1Winner = winner === 'X';
                    
                    showWinnerModal(game, winnerName, isPlayer1Winner, () => {
                        game.resetBoard();
                        updateBoard();
                        updateScoreboard();
                    }, () => {
                        screen.remove();
                        const selectModeScreen = createSelectModeScreen((mode) => {
                            screenManager.transition(createNameFormScreen(mode, (names) => {
                                startGame(names);
                            }));
                        });
                        screenManager.transition(selectModeScreen);
                    });
                }
            }, 500);
            return;
        }

        if (result && result.type === 'win') {
            setTimeout(() => {
                const isPlayer1Winner = result.winner === game.player1;
                const scores = {
                    player1: game.scores.player1,
                    player2: game.scores.player2,
                    ties: game.scores.ties
                };
                
                historyManager.addMatch({
                    player1: game.player1,
                    player2: game.player2,
                    winner: result.winner,
                    mode: game.mode,
                    player1Symbol: game.player1Symbol,
                    player2Symbol: game.player2Symbol,
                    scores: scores
                });
                
                if (game.mode === 'cpu') {
                    if (isPlayer1Winner) {
                        modalManager.showVictoryModal(result.winner, game.player1, game.player2, true, scores, nextRound, exitGame);
                    } else {
                        const loserName = game.player1;
                        modalManager.showDefeatModal(loserName, result.winner, game.player1, game.player2, true, scores, nextRound, exitGame);
                    }
                } else {
                    modalManager.showVictoryModal(result.winner, game.player1, game.player2, false, scores, nextRound, exitGame);
                }
            }, 500);
            return;
        }

        if (result && result.type === 'tie') {
            setTimeout(() => {
                historyManager.addMatch({
                    player1: game.player1,
                    player2: game.player2,
                    winner: 'tie',
                    mode: game.mode,
                    player1Symbol: game.player1Symbol,
                    player2Symbol: game.player2Symbol,
                    scores: {
                        player1: game.scores.player1,
                        player2: game.scores.player2,
                        ties: game.scores.ties
                    }
                });
                
                showDrawModal(game, () => {
                    game.resetBoard();
                    updateBoard();
                    updateScoreboard();
                }, () => {
                    screen.remove();
                    const selectModeScreen = createSelectModeScreen((mode) => {
                        screenManager.transition(createNameFormScreen(mode, (names) => {
                            startGame(names);
                        }));
                    });
                    screenManager.transition(selectModeScreen);
                });
            }, 500);
            return;
        }

        if (game.mode === 'cpu' && !game.gameOver) {
            setTimeout(() => {
                const aiMove = game.getAIMove();
                const aiResult = game.makeMove(aiMove);
                updateBoard();
                updateScoreboard();

                if (aiResult && aiResult.type === 'win') {
                    setTimeout(() => {
                        const loserName = game.player1;
                        const scores = {
                            player1: game.scores.player1,
                            player2: game.scores.player2,
                            ties: game.scores.ties
                        };
                        
                        historyManager.addMatch({
                            player1: game.player1,
                            player2: game.player2,
                            winner: aiResult.winner,
                            mode: game.mode,
                            player1Symbol: game.player1Symbol,
                            player2Symbol: game.player2Symbol,
                            scores: scores
                        });
                        
                        modalManager.showDefeatModal(loserName, aiResult.winner, game.player1, game.player2, true, scores, nextRound, exitGame);
                    }, 500);
                } else if (aiResult && aiResult.type === 'tie') {
                    setTimeout(() => {
                        historyManager.addMatch({
                            player1: game.player1,
                            player2: game.player2,
                            winner: 'tie',
                            mode: game.mode,
                            player1Symbol: game.player1Symbol,
                            player2Symbol: game.player2Symbol,
                            scores: {
                                player1: game.scores.player1,
                                player2: game.scores.player2,
                                ties: game.scores.ties
                            }
                        });
                        
                        showDrawModal(game, () => {
                            game.resetBoard();
                            updateBoard();
                            updateScoreboard();
                        }, () => {
                            screen.remove();
                            const selectModeScreen = createSelectModeScreen((mode) => {
                                screenManager.transition(createNameFormScreen(mode, (names) => {
                                    startGame(names);
                                }));
                            });
                            screenManager.transition(selectModeScreen);
                        });
                    }, 500);
                }
            }, 500);
        }
    }

    function nextRound() {
        game.resetBoard();
        updateBoard();
        updateScoreboard();
        checkAIFirstMove();
    }

    function exitGame() {
        const selectModeScreen = createSelectModeScreen((mode) => {
            screenManager.transition(createNameFormScreen(mode, (names) => {
                startGame(names);
            }));
        });
        screenManager.transition(selectModeScreen);
    }

    function checkAIFirstMove() {
        if (game.mode === 'cpu' && game.player1Symbol === 'O' && !game.gameOver) {
            setTimeout(() => {
                const aiMove = game.getAIMove();
                game.makeMove(aiMove);
                updateBoard();
                updateScoreboard();
            }, 500);
        }
    }

    updatePlayerSymbols();
    checkAIFirstMove();

    return screen;
}

function createAudioControls() {
    if (typeof AudioManager === 'undefined') {
        return null;
    }

    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button id="musicToggle" class="audio-btn pulse" title="Música">
            <span class="icon">${AudioManager.isMusicEnabled() ? '🔊' : '🔇'}</span>
            <span class="label">Música</span>
        </button>
        <button id="sfxToggle" class="audio-btn" title="Efectos de sonido">
            <span class="icon">${AudioManager.isSFXEnabled() ? '🔔' : '🔕'}</span>
            <span class="label">Efectos</span>
        </button>
    `;

    setTimeout(() => {
        const musicBtn = document.getElementById('musicToggle');
        const sfxBtn = document.getElementById('sfxToggle');
        
        if (musicBtn && typeof AnimationManager !== 'undefined') {
            AnimationManager.addRippleEffect(musicBtn);
            musicBtn.addEventListener('click', () => {
                musicBtn.classList.remove('pulse');
                const enabled = AudioManager.toggleMusic();
                const icon = musicBtn.querySelector('.icon');
                if (icon) icon.textContent = enabled ? '🔊' : '🔇';
                
                if (AudioManager.isSFXEnabled()) {
                    setTimeout(() => AudioManager.playSound('click'), 100);
                }
            });
        }

        if (sfxBtn && typeof AnimationManager !== 'undefined') {
            AnimationManager.addRippleEffect(sfxBtn);
            sfxBtn.addEventListener('click', () => {
                const wasSfxEnabled = AudioManager.isSFXEnabled();
                const enabled = AudioManager.toggleSFX();
                const icon = sfxBtn.querySelector('.icon');
                if (icon) icon.textContent = enabled ? '🔔' : '🔕';
                
                if (wasSfxEnabled) {
                    setTimeout(() => AudioManager.playSound('click'), 50);
                }
            });
        }
    }, 100);

    return audioControls;
}

function initializeBoardAnimations(boardElement) {
    if (typeof AnimationManager === 'undefined') return;
    
    const cells = boardElement.querySelectorAll('.cell');
    AnimationManager.staggerElements(Array.from(cells), 50);
}

function animateCellClick(cell, symbol) {
    if (typeof AnimationManager === 'undefined') return;
    
    AnimationManager.animateCell(cell, symbol);
}

function highlightWinner(winningCells) {
    if (typeof AnimationManager === 'undefined') return;
    
    AnimationManager.highlightWinningCells(winningCells);
}

function updateScoreWithAnimation(scoreElement) {
    if (typeof AnimationManager === 'undefined') return;
    
    AnimationManager.animateScore(scoreElement);
}

function showTieModal(game, onNext, onExit) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const isCPU = game.mode === 'cpu';
    const player1Name = game.player1;
    const player2Name = isCPU ? 'CPU' : game.player2;
    
    modal.innerHTML = `
        <div class="modal-content modal-square">
            <div class="modal-background" style="background-image: url('./assets/backgrounds/modals/square_modal_bg_large.png');"></div>
            <img src="./assets/game_icons/tie_icon.svg" alt="Empate" class="modal-icon tie-icon">
            <h2 class="modal-title">EMPATE ENTRE</h2>
            <p class="modal-subtitle">${player1Name} y ${player2Name}</p>
            <div class="modal-scoreboard">
                <div class="modal-score-item">
                    <div class="modal-score-initial">${player1Name.charAt(0).toUpperCase()}</div>
                    <span>${game.scores.player1} GANADAS</span>
                </div>
                <div class="modal-score-item">
                    <div class="modal-score-initial">${player2Name.charAt(0).toUpperCase()}</div>
                    <span>${game.scores.player2} GANADAS</span>
                </div>
                <div class="modal-score-item">
                    <img src="./assets/game_icons/tie_icon.svg" alt="Empates" class="modal-ties-icon">
                    <span>${game.scores.ties} EMPATES</span>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-exit modal-btn-equal">SALIR</button>
                <button class="modal-btn modal-btn-next modal-btn-equal">PRÓXIMO ROUND</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const exitBtn = modal.querySelector('.modal-btn-exit');
    const nextBtn = modal.querySelector('.modal-btn-next');
    
    exitBtn.addEventListener('click', () => {
        modal.remove();
        onExit();
    });
    
    nextBtn.addEventListener('click', () => {
        modal.remove();
        onNext();
    });
    
    if (typeof AnimationManager !== 'undefined') {
        AnimationManager.addRippleEffect(exitBtn);
        AnimationManager.addRippleEffect(nextBtn);
    }
}

function showDrawModal(game, onNext, onExit) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const isCPU = game.mode === 'cpu';
    const player1Name = game.player1;
    const player2Name = isCPU ? 'CPU' : game.player2;
    
    modal.innerHTML = `
        <div class="modal-content modal-square">
            <div class="modal-background" style="background-image: url('./assets/backgrounds/modals/square_modal_bg_large.png');"></div>
            <img src="./assets/game_icons/tie_icon.svg" alt="Empate" class="modal-icon tie-icon">
            <h2 class="modal-title">EMPATE ENTRE</h2>
            <p class="modal-subtitle">${player1Name} y ${player2Name}</p>
            <div class="modal-scoreboard">
                <div class="modal-score-item">
                    <div class="modal-score-initial">${player1Name.charAt(0).toUpperCase()}</div>
                    <span>${game.scores.player1} GANADAS</span>
                </div>
                <div class="modal-score-item">
                    <div class="modal-score-initial">${player2Name.charAt(0).toUpperCase()}</div>
                    <span>${game.scores.player2} GANADAS</span>
                </div>
                <div class="modal-score-item">
                    <img src="./assets/game_icons/tie_icon.svg" alt="Empates" class="modal-ties-icon">
                    <span>${game.scores.ties} EMPATES</span>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-exit modal-btn-equal">SALIR</button>
                <button class="modal-btn modal-btn-next modal-btn-equal">PRÓXIMO ROUND</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const exitBtn = modal.querySelector('.modal-btn-exit');
    const nextBtn = modal.querySelector('.modal-btn-next');
    
    exitBtn.addEventListener('click', () => {
        modal.remove();
        onExit();
    });
    
    nextBtn.addEventListener('click', () => {
        modal.remove();
        onNext();
    });
    
    if (typeof AnimationManager !== 'undefined') {
        AnimationManager.addRippleEffect(exitBtn);
        AnimationManager.addRippleEffect(nextBtn);
    }
}

