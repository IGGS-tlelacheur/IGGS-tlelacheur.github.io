class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.collision = false;
    }
}

class ChaoticBalls {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.WIDTH = 800;
        this.HEIGHT = 800;
        this.STARTX = 0.4;
        this.STARTY = 0.25;
        this.RANDDIST = 20;
        this.BG = '#343a40';
        this.CIRCOL = '#dee2e6';

        this.NBALLS = 2;
        this.GRAVITY = 1;
        this.RADIUS = 375;
        this.RADBALL = 20;
        this.DAMPING = 0.97;

        this.balls = [];
        this.animationId = null;
        this.isPaused = false;
        this.isStopped = true;
        this.animationSpeed = 1.0;
        this.lastFrameTime = 0;

        this.initializeControls();
        this.resetBalls();
        this.draw();
    }

    initializeControls() {
        const controls = {
            numBalls: document.getElementById('numBalls'),
            gravity: document.getElementById('gravity'),
            damping: document.getElementById('damping'),
            ballRadius: document.getElementById('ballRadius'),
            containerRadius: document.getElementById('containerRadius'),
            animationSpeed: document.getElementById('animationSpeed'),
            startBtn: document.getElementById('startBtn'),
            resetBtn: document.getElementById('resetBtn')
        };

        controls.numBalls.addEventListener('change', (e) => {
            this.NBALLS = parseInt(e.target.value);
            this.resetBalls();
        });

        controls.gravity.addEventListener('input', (e) => {
            this.GRAVITY = parseFloat(e.target.value);
            document.getElementById('gravityValue').textContent = this.GRAVITY.toFixed(1);
        });

        controls.damping.addEventListener('input', (e) => {
            this.DAMPING = parseFloat(e.target.value);
            document.getElementById('dampingValue').textContent = this.DAMPING.toFixed(2);
        });

        controls.ballRadius.addEventListener('input', (e) => {
            this.RADBALL = parseInt(e.target.value);
            document.getElementById('ballRadiusValue').textContent = this.RADBALL;
        });

        controls.containerRadius.addEventListener('input', (e) => {
            this.RADIUS = parseInt(e.target.value);
            document.getElementById('containerRadiusValue').textContent = this.RADIUS;
        });

        controls.animationSpeed.addEventListener('input', (e) => {
            this.animationSpeed = parseFloat(e.target.value);
            document.getElementById('animationSpeedValue').textContent = this.animationSpeed.toFixed(1) + 'x';
        });

        controls.startBtn.addEventListener('click', () => {
            this.toggleStartPause();
        });

        controls.resetBtn.addEventListener('click', () => {
            this.resetBalls();
        });
    }

    randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    resetBalls() {
        this.balls = [];
        for (let i = 0; i < this.NBALLS; i++) {
            const x = this.WIDTH * this.STARTX + (Math.random() - 0.5) * 2 * this.RANDDIST;
            const y = this.HEIGHT * this.STARTY + (Math.random() - 0.5) * 2 * this.RANDDIST;
            const color = this.randomColor();
            this.balls.push(new Ball(x, y, color));
        }
        if (!this.isStopped && !this.isPaused) {
            this.draw();
        }
    }

    toggleStartPause() {
        const startBtn = document.getElementById('startBtn');

        if (this.isStopped) {
            // Start the animation
            this.isStopped = false;
            this.isPaused = false;
            this.lastFrameTime = performance.now();
            startBtn.textContent = 'Pause';
            startBtn.classList.add('pause');
            this.animate();
        } else if (this.isPaused) {
            // Resume the animation
            this.isPaused = false;
            this.lastFrameTime = performance.now();
            startBtn.textContent = 'Pause';
            startBtn.classList.add('pause');
            this.animate();
        } else {
            // Pause the animation
            this.isPaused = true;
            startBtn.textContent = 'Start';
            startBtn.classList.remove('pause');
        }
    }


    vectorDot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }

    vectorScale(vector, scalar) {
        return [vector[0] * scalar, vector[1] * scalar];
    }

    collision(balls) {
        for (let i = 0; i < this.NBALLS; i++) {
            const ball = balls[i];
            const dist = Math.sqrt(
                Math.pow((this.WIDTH / 2) - ball.x, 2) +
                Math.pow((this.HEIGHT / 2) - ball.y, 2)
            );

            if (dist >= this.RADIUS - this.RADBALL || ball.collision) {
                const uNX = ((this.WIDTH / 2) - ball.x) / dist;
                const uNY = ((this.HEIGHT / 2) - ball.y) / dist;

                const uTX = -uNY;
                const uTY = uNX;

                const vX = ball.speedX;
                const vY = ball.speedY + this.GRAVITY;

                const uN = [uNX, uNY];
                const uT = [uTX, uTY];
                const v = [vX, vY];

                const vN = this.vectorDot(uN, v);
                const vT = this.vectorDot(uT, v);

                const v2T = this.vectorScale(uT, vT);
                const v2N = this.vectorScale(uN, -vN);

                const speedX = v2N[0] + v2T[0];
                const speedY = v2N[1] + v2T[1];

                ball.speedX = this.DAMPING * speedX;
                ball.speedY = this.DAMPING * speedY;

                const speedOut = Math.sqrt(speedX * speedX + speedY * speedY);
                const energy = 0.5 * speedOut * speedOut + (this.HEIGHT - ball.y);
                console.log(`Energy = ${energy.toFixed(2)}`);
            }
        }
    }

    update() {
        for (let i = 0; i < this.NBALLS; i++) {
            const ball = this.balls[i];

            ball.speedY += this.GRAVITY;

            let centerX = Math.round(ball.x + ball.speedX);
            let centerY = Math.round(ball.y + ball.speedY);

            let dist = Math.sqrt(
                Math.pow((this.WIDTH / 2) - centerX, 2) +
                Math.pow((this.HEIGHT / 2) - centerY, 2)
            );

            if (dist === 0) dist = 0.0001;

            const uNX = ((this.WIDTH / 2) - centerX) / dist;
            const uNY = ((this.HEIGHT / 2) - centerY) / dist;

            if (dist > (this.RADIUS - this.RADBALL)) {
                centerX = Math.ceil((this.WIDTH / 2) - uNX * (this.RADIUS - this.RADBALL));
                centerY = Math.ceil((this.HEIGHT / 2) - uNY * (this.RADIUS - this.RADBALL));
                ball.collision = true;
            }

            ball.x = centerX;
            ball.y = centerY;
        }

        this.collision(this.balls);

        for (let i = 0; i < this.NBALLS; i++) {
            this.balls[i].collision = false;
        }
    }

    draw() {
        this.ctx.fillStyle = this.BG;
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        this.ctx.strokeStyle = this.CIRCOL;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, this.RADIUS, 0, 2 * Math.PI);
        this.ctx.stroke();

        for (let i = 0; i < this.NBALLS; i++) {
            const ball = this.balls[i];
            this.ctx.fillStyle = ball.color;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, this.RADBALL, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    animate() {
        if (this.isStopped) {
            return;
        }

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        const targetFrameTime = 16.67 / this.animationSpeed; // 60fps base, adjusted by speed

        if (!this.isPaused && deltaTime >= targetFrameTime) {
            this.update();
            this.draw();
            this.lastFrameTime = currentTime;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChaoticBalls();
});