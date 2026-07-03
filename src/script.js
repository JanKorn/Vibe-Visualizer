import { visualizations } from './visualizations/index.js';
import { setupControls } from './controls.js';
import { setupAudio, getProcessedData } from './audio.js';

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('startBtn');

let currentAnimation = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize controls
const controls = setupControls(
    currentAnimation,
    visualizations.length,
    (newIndex) => {
        currentAnimation = newIndex;
    }
);

// Start button handler
btn.addEventListener('click', async function() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        setupAudio(stream);
        btn.style.display = 'none';
        controls.activate();
    } catch (err) {
        console.error("Capture abgebrochen oder nicht unterstützt:", err);
    }
});

// Main draw loop
function draw() {
    requestAnimationFrame(draw);

    // Dark-Fade effect for trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Get processed audio data
    const processedData = getProcessedData();

    // Draw current visualization
    if (processedData && visualizations[currentAnimation]) {
        visualizations[currentAnimation].draw(ctx, processedData, centerX, centerY, canvas);
    }
}

// Start drawing (will only show visuals after audio is set up)
draw();

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});