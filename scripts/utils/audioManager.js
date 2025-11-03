const AudioManager = {
    backgroundMusic: null,
    sounds: {},
    musicEnabled: true,
    soundEnabled: true,
    
    init() {
        // Verificar si ya se preguntó por las preferencias de audio
        const preferencesSet = localStorage.getItem('soundPreferencesSet');
        
        if (preferencesSet === 'true') {
            // Cargar preferencias guardadas
            const savedMusicPref = localStorage.getItem('musicEnabled');
            const savedSoundPref = localStorage.getItem('soundEnabled');
            
            this.musicEnabled = savedMusicPref !== 'false';
            this.soundEnabled = savedSoundPref !== 'false';
            
            this.loadAudio();
        } else {
            // Primera vez: mostrar modal de permiso
            this.showPermissionModal();
        }
    },
    
    showPermissionModal() {
        const modal = document.createElement('div');
        modal.className = 'audio-permission-modal';
        
        modal.innerHTML = `
            <div class="audio-permission-content">
                <div class="audio-permission-icon">🎵</div>
                <h2>¡BIENVENIDO!</h2>
                <p>¿Deseas jugar con música y efectos de sonido?</p>
                <p style="font-size: 14px; opacity: 0.8; margin-top: 5px;">Puedes cambiar esto después en el panel de controles</p>
                <div class="audio-permission-buttons">
                    <button class="audio-permission-btn accept">SÍ, CON AUDIO</button>
                    <button class="audio-permission-btn decline">NO, SILENCIO</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const acceptBtn = modal.querySelector('.accept');
        const declineBtn = modal.querySelector('.decline');
        
        acceptBtn.addEventListener('click', () => {
            this.musicEnabled = true;
            this.soundEnabled = true;
            localStorage.setItem('musicEnabled', 'true');
            localStorage.setItem('soundEnabled', 'true');
            localStorage.setItem('soundPreferencesSet', 'true');
            modal.remove();
            this.loadAudio();
        });
        
        declineBtn.addEventListener('click', () => {
            this.musicEnabled = false;
            this.soundEnabled = false;
            localStorage.setItem('musicEnabled', 'false');
            localStorage.setItem('soundEnabled', 'false');
            localStorage.setItem('soundPreferencesSet', 'true');
            modal.remove();
        });
    },
    
    loadAudio() {
        this.backgroundMusic = new Audio('/assets/song/background.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
        
        this.sounds = {
            place: new Audio('/assets/song/place.wav'),
            win: new Audio('/assets/song/win.wav'),
            draw: new Audio('/assets/song/draw.wav'),
            click: new Audio('/assets/song/click.wav'),
            start: new Audio('/assets/song/start.mp3')
        };
        
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
        });
        
        if (this.musicEnabled) {
            this.playMusic();
        }
    },
    
    playMusic() {
        if (!this.musicEnabled || !this.backgroundMusic) return;
        
        this.backgroundMusic.play().catch(err => {
            console.log('No se pudo reproducir la música:', err);
        });
    },
    
    stopMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    },
    
    playSound(soundName) {
        if (!this.soundEnabled) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    },
    
    playSFX(soundName) {
        return this.playSound(soundName);
    },
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('musicEnabled', this.musicEnabled.toString());
        
        if (this.musicEnabled) {
            this.playMusic();
        } else {
            this.stopMusic();
        }
        
        return this.musicEnabled;
    },
    
    toggleSFX() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('soundEnabled', this.soundEnabled.toString());
        return this.soundEnabled;
    },
    
    isMusicEnabled() {
        return this.musicEnabled;
    },
    
    isSFXEnabled() {
        return this.soundEnabled;
    }
};
