function createNameFormScreen(mode, onSubmit) {
    const formContainer = document.createElement('div');
    formContainer.className = 'form-name-request';
    
    const title = document.createElement('h1');
    title.className = 'form-name-request-title';
    
    const form = document.createElement('form');
    form.id = 'nameForm';
    
    if (mode === 'cpu') {
        title.textContent = 'NOMBRAR JUGADOR';
        
        const playerInput = document.createElement('input');
        playerInput.type = 'text';
        playerInput.id = 'playerName';
        playerInput.name = 'playerName';
        playerInput.placeholder = 'Nombrar Jugador';
        playerInput.autofocus = true;
        playerInput.required = true;
        
        form.appendChild(playerInput);
    } else {
        title.textContent = 'NOMBRAR JUGADORES';
        
        const player1Input = document.createElement('input');
        player1Input.type = 'text';
        player1Input.id = 'playerName1';
        player1Input.name = 'playerName1';
        player1Input.placeholder = 'Jugador 1';
        player1Input.autofocus = true;
        player1Input.required = true;
        
        const player2Input = document.createElement('input');
        player2Input.type = 'text';
        player2Input.id = 'playerName2';
        player2Input.name = 'playerName2';
        player2Input.placeholder = 'Jugador 2';
        player2Input.required = true;
        
        form.appendChild(player1Input);
        form.appendChild(player2Input);
    }
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'form-name-request-btn';
    submitBtn.textContent = 'INICIAR';
    
    form.appendChild(submitBtn);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const names = {
            mode: mode
        };
        
        if (mode === 'cpu') {
            names.player1 = document.getElementById('playerName').value;
            names.player2 = 'CPU';
        } else {
            names.player1 = document.getElementById('playerName1').value;
            names.player2 = document.getElementById('playerName2').value;
        }
        
        const gameData = {
            mode: mode,
            player1: names.player1,
            player2: names.player2
        };

        console.log('nameFormScreen - gameData created:', gameData);
        onSubmit(gameData);
    });
    
    formContainer.appendChild(title);
    formContainer.appendChild(form);
    
    return formContainer;
}
