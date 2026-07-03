import { getColor } from '../config/colors.js';

export const waveformCircle = {
    name: "Waveform Circle",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        ctx.beginPath();
        processedData.forEach((value, i) => {
            const angle = i * (Math.PI * 2 / processedData.length);
            const radius = 100 + value * 1.2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.strokeStyle = getColor(128, 0, 1, 0.8);
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};