import { getColorWithOffset } from '../config/colors.js';

export const spiralGalaxy = {
    name: "Spiral Galaxy",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            const angle = i * 0.3;
            const radius = i * 1.5 + value * 0.8;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const hue = (angle * 20) % 360;
            ctx.beginPath();
            ctx.arc(x, y, value / 25, 0, Math.PI * 2);
            ctx.fillStyle = getColorWithOffset(hue, 0, 0.6);
            ctx.fill();
        });
    }
};