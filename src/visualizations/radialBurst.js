import { getRainbowColor } from '../config/colors.js';

export const radialBurst = {
    name: "Radial Burst",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            const angle = i * (Math.PI * 2 / processedData.length);
            const length = value * 2.5;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            
            ctx.strokeStyle = getRainbowColor(i, processedData.length, 0.6);
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Endpoint
            ctx.beginPath();
            ctx.arc(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length,
                3, 0, Math.PI * 2
            );
            ctx.fillStyle = getRainbowColor(i, processedData.length, 0.8);
            ctx.fill();
        });
    }
};