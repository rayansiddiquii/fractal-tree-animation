const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const music = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startX = canvas.width / 2;
const startY = canvas.height - 80;
const initialLength = 100;
const angleStep = 30 * (Math.PI / 180);

let drawQueue = [];
let currentIndex = 0;

// --- SPEED CONTROL ---
const framesToSkip = 2; 
let frameCounter = 0;

function generateTree(x, y, len, angle) {
    if (len < 10) return;
    const endX = x + Math.sin(angle) * len;
    const endY = y - Math.cos(angle) * len;

    drawQueue.push({ x1: x, y1: y, x2: endX, y2: endY });

    generateTree(endX, endY, (3 * len / 4), angle + angleStep);
    generateTree(endX, endY, (3 * len / 4), angle - angleStep);
}

function animate() {
    if (currentIndex < drawQueue.length) {
        // Speed control logic
        if (frameCounter % framesToSkip === 0) {
            const branch = drawQueue[currentIndex];

            ctx.beginPath();
            ctx.moveTo(branch.x1, branch.y1);
            ctx.lineTo(branch.x2, branch.y2);
            ctx.strokeStyle = "brown";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(branch.x2, branch.y2, 2, 0, Math.PI * 2);
            ctx.fillStyle = "orange";
            ctx.fill();

            currentIndex++;
        }
        frameCounter++;
        requestAnimationFrame(animate);
    } else {
        // Drawing khatam hone par music dheere se band karna ho to yahan logic aayega
    }
}

// Button Click Event
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none'; // Button hide 
    music.play();                   // Music start 
    generateTree(startX, startY, initialLength, 0);
    animate();                      // Drawing 
});