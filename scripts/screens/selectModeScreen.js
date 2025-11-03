function createSelectModeScreen(onModeSelected) {
    const selectModeContainer = document.createElement('div');
    selectModeContainer.className = 'select-mode-container';
    
    const title = document.createElement('h1');
    title.className = 'select-mode-title';
    title.textContent = 'Tic Tac Toe';
    
    const modeButtons = document.createElement('div');
    modeButtons.className = 'mode-buttons';
    
    const singlePlayerBtn = document.createElement('button');
    singlePlayerBtn.className = 'single-player-btn';
    singlePlayerBtn.textContent = 'JUGADOR VS CPU';
    singlePlayerBtn.addEventListener('click', () => {
        if (onModeSelected) onModeSelected('cpu');
    });
    
    const multiPlayerBtn = document.createElement('button');
    multiPlayerBtn.className = 'multi-player-btn';
    multiPlayerBtn.textContent = 'JUGADOR VS JUGADOR';
    multiPlayerBtn.addEventListener('click', () => {
        if (onModeSelected) onModeSelected('player');
    });
    
    modeButtons.appendChild(singlePlayerBtn);
    modeButtons.appendChild(multiPlayerBtn);
    
    selectModeContainer.appendChild(title);
    selectModeContainer.appendChild(modeButtons);
    
    return selectModeContainer;
}
