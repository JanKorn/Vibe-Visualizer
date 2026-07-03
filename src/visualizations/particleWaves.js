import { getColor } from '../config/colors.js';

export const particleWaves = {
    name: "Particle Waves",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            const x = (i / processedData.length) * canvas.width;
            const y = centerY + Math.sin((i + Date.now() * 0.005) * 0.08) * value * 1.2;
            
            const hue = (i / processedData.length) * 360 + Date.now() * 0.05;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue % 360}, 80%, 60%, 0.7)`;
            ctx.fill();
        });
    }
};