const AudioManager = {
    bgMusic: null,
    sounds: {},
    musicEnabled: true,
    sfxEnabled: true,
    audioAvailable: false,

    init() {
        try {
            this.bgMusic = new Audio();
            this.bgMusic.src = './assets/song/background.mp3';
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.3;
            
            this.bgMusic.addEventListener('error', (e) => {
                this.audioAvailable = false;
            });
            
            this.bgMusic.addEventListener('canplay', () => {
                this.audioAvailable = true;
            });
            
            this.sounds = {
                place: this.createSound('./assets/song/place.wav'),
                win: this.createSound('./assets/song/win.wav'),
                draw: this.createSound('./assets/song/draw.wav'),
                click: this.createSound('./assets/song/click.wav'),
                start: this.createSound('./assets/song/start.mp3')
            };

            Object.values(this.sounds).forEach(sound => {
                if (sound) {
                    sound.volume = 0.5;
                    sound.addEventListener('error', () => {
                        this.audioAvailable = false;
                    });
                }
            });
        } catch (error) {
            this.audioAvailable = false;
        }

        const savedMusicPref = localStorage.getItem('musicEnabled');
        const savedSfxPref = localStorage.getItem('sfxEnabled');
        
        if (savedMusicPref !== null) {
            this.musicEnabled = savedMusicPref === 'true';
        }
        if (savedSfxPref !== null) {
            this.sfxEnabled = savedSfxPref === 'true';
        }
    },

    createSound(src) {
        const audio = new Audio();
        audio.src = src;
        audio.volume = 0.5;
        
        audio.addEventListener('error', (e) => {});
        
        return audio;
    },

    playMusic() {
        if (this.musicEnabled && this.bgMusic) {
            this.bgMusic.volume = 0.3;
            const playPromise = this.bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    this.audioAvailable = false;
                });
            }
        }
    },

    stopMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    },

    playSound(soundName) {
        if (this.sfxEnabled && this.sounds[soundName] && this.audioAvailable !== false) {
            const sound = this.sounds[soundName];
            sound.currentTime = 0;
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    this.audioAvailable = false;
                });
            }
        }
    },

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('musicEnabled', this.musicEnabled);
        
        if (this.musicEnabled) {
            this.playMusic();
        } else {
            this.stopMusic();
        }
        
        return this.musicEnabled;
    },

    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        localStorage.setItem('sfxEnabled', this.sfxEnabled);
        return this.sfxEnabled;
    },

    isMusicEnabled() {
        return this.musicEnabled;
    },

    isSFXEnabled() {
        return this.sfxEnabled;
    }
};
