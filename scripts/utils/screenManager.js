class ScreenManager {
    constructor() {
        this.currentScreen = null;
    }

    show(screen) {
        if (this.currentScreen) {
            this.hide(this.currentScreen);
        }
        screen.classList.add('screen');
        document.body.appendChild(screen);
        this.currentScreen = screen;
        
        requestAnimationFrame(() => {
            screen.style.opacity = '1';
        });
    }

    hide(screen, callback) {
        if (!screen) return;
        
        screen.classList.add('fade-out');
        
        setTimeout(() => {
            if (screen.parentNode) {
                screen.remove();
            }
            if (callback) callback();
        }, 300);
    }

    transition(newScreen) {
        this.hide(this.currentScreen, () => {
            this.show(newScreen);
        });
    }
}

const screenManager = new ScreenManager();
