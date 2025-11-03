const AnimationManager = {
    transitionScreen(oldScreen, newScreen, direction = 'right') {
        if (oldScreen) {
            oldScreen.classList.add('fade-out');
            setTimeout(() => {
                if (oldScreen.parentNode) {
                    oldScreen.remove();
                }
                this.showScreen(newScreen, direction);
            }, 300);
        } else {
            this.showScreen(newScreen, direction);
        }
    },

    showScreen(screen, direction = 'right') {
        screen.classList.add('screen');
        
        if (direction === 'right') {
            screen.classList.add('slide-in-right');
        } else if (direction === 'left') {
            screen.classList.add('slide-in-left');
        } else if (direction === 'bottom') {
            screen.classList.add('slide-in-bottom');
        }
        
        document.body.appendChild(screen);
        
        requestAnimationFrame(() => {
            screen.style.opacity = '1';
        });
        
        setTimeout(() => {
            screen.classList.remove('slide-in-right', 'slide-in-left', 'slide-in-bottom');
            screen.classList.add('active');
        }, 400);
    },

    animateCell(cell, symbol) {
        cell.classList.add('taken');
        const symbolElement = cell.querySelector('.symbol');
        if (symbolElement) {
            symbolElement.classList.add(symbol.toLowerCase());
        }
        
        requestAnimationFrame(() => {
            cell.style.transform = 'scale(1)';
        });
    },

    highlightWinningCells(cells) {
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.classList.add('winner', 'highlight');
            }, index * 100);
        });
    },

    animateScore(scoreElement) {
        scoreElement.classList.add('updated');
        setTimeout(() => {
            scoreElement.classList.remove('updated');
        }, 500);
    },

    showModal(modal) {
        modal.style.display = 'flex';
        modal.classList.remove('closing');
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    },

    hideModal(modal, callback) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '0';
            modal.classList.remove('closing');
            if (callback) callback();
        }, 300);
    },

    pulseElement(element, duration = 2000) {
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
        }, duration);
    },

    shakeElement(element) {
        element.classList.add('error');
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.classList.remove('error');
            element.style.animation = '';
        }, 500);
    },

    addRippleEffect(button) {
        if (!button.classList.contains('ripple')) {
            button.classList.add('ripple');
        }
    },

    staggerElements(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
        });
    },

    bounceIn(element) {
        element.style.animation = 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },

    fadeIn(element, duration = 400) {
        element.style.animation = `fadeIn ${duration}ms ease-in-out`;
        element.style.opacity = '1';
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },

    fadeOut(element, duration = 300, callback) {
        element.style.animation = `fadeOut ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.animation = '';
            if (callback) callback();
        }, duration);
    }
};
