import { getColor } from '../config/colors.js';

export const circularVibe = {
    name: "Circular Vibe",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            const radius = value * 1.2;
            const angle = i * (Math.PI * 2 / processedData.length);
            
            const x = centerX + Math.cos(angle) * (150 + radius/2);
            const y = centerY + Math.sin(angle) * (150 + radius/2);

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = getColor(value, i, processedData.length, 0.7);
            ctx.fill();
        });
    }
};