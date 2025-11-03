class EffectsManager {
    constructor() {
        this.enabled = true;
        this.confettiCanvas = null;
        this.rainCanvas = null;
        this.activeEffects = new Set();
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.clearAllEffects();
        }
    }

    onGameWin(winner, isAI = false) {
        if (!this.enabled) return;
        
        if (!isAI) {
            this.launchConfetti();
        }
        this.highlightWinner();
    }

    onGameLoss() {
        if (!this.enabled) return;
        this.startRainEffect();
    }

    onMove(position, symbol) {
        if (!this.enabled) return;
        this.animateCellPlacement(position, symbol);
    }

    onTurnChange(currentPlayer, isAI = false) {
        if (!this.enabled) return;
        this.animateTurnIndicator(currentPlayer, isAI);
    }

    launchConfetti() {
        if (this.confettiCanvas) return;
        
        this.confettiCanvas = this.createCanvas();
        this.runConfettiAnimation();
    }

    startRainEffect() {
        if (this.rainCanvas) return;
        
        this.rainCanvas = this.createCanvas();
        this.runRainAnimation();
    }

    animateCellPlacement(position, symbol) {
        const cell = document.querySelector(`[data-index="${position}"]`);
        if (!cell) return;

        cell.style.transform = 'scale(0)';
        cell.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        requestAnimationFrame(() => {
            cell.style.transform = 'scale(1)';
        });
    }

    animateTurnIndicator(currentPlayer, isAI) {
        const indicators = document.querySelectorAll('.player-container');
        indicators.forEach(indicator => {
            indicator.classList.remove('active-player');
        });

        const activeIndicator = document.querySelector(
            isAI ? '.player-container.player-2' : '.player-container.player-1'
        );
        
        if (activeIndicator) {
            activeIndicator.classList.add('active-player');
        }
    }

    highlightWinner() {
        const winningCells = this.getWinningCells();
        winningCells.forEach((cell, index) => {
            setTimeout(() => {
                cell.classList.add('winning-cell');
            }, index * 100);
        });
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    }

    runConfettiAnimation() {
        const ctx = this.confettiCanvas.getContext('2d');
        const particles = [];
        const colors = ['#F4B41A', '#2AB4FD', '#EE9200', '#FFD700', '#00CED1'];
        
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * this.confettiCanvas.width,
                y: -10 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                life: 0,
                maxLife: 180 + Math.random() * 60
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.rotation += p.rotationSpeed;
                p.life++;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
                ctx.restore();

                if (p.life >= p.maxLife || p.y > this.confettiCanvas.height) {
                    particles.splice(i, 1);
                }
            }

            if (particles.length > 0) {
                requestAnimationFrame(animate);
            } else {
                this.confettiCanvas.remove();
                this.confettiCanvas = null;
            }
        };

        animate();
    }

    runRainAnimation() {
        const ctx = this.rainCanvas.getContext('2d');
        const drops = [];
        
        for (let i = 0; i < 40; i++) {
            drops.push({
                x: Math.random() * this.rainCanvas.width,
                y: Math.random() * this.rainCanvas.height,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);
            
            drops.forEach(drop => {
                drop.y += drop.speed;
                if (drop.y > this.rainCanvas.height) {
                    drop.y = -5;
                    drop.x = Math.random() * this.rainCanvas.width;
                }

                ctx.strokeStyle = `rgba(135, 206, 235, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + 10);
                ctx.stroke();
            });

            if (this.rainCanvas) {
                requestAnimationFrame(animate);
            }
        };

        animate();
        
        setTimeout(() => {
            if (this.rainCanvas) {
                this.rainCanvas.remove();
                this.rainCanvas = null;
            }
        }, 3000);
    }

    getWinningCells() {
        return document.querySelectorAll('.game-cell.disabled');
    }

    clearAllEffects() {
        if (this.confettiCanvas) {
            this.confettiCanvas.remove();
            this.confettiCanvas = null;
        }
        if (this.rainCanvas) {
            this.rainCanvas.remove();
            this.rainCanvas = null;
        }
        this.activeEffects.clear();
    }
}

const effectsManager = new EffectsManager();