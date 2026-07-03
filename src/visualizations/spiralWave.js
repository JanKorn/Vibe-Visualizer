import { getRainbowColor } from '../config/colors.js';

export const spiralWave = {
    name: "Spiral Wave",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const time = Date.now() * 0.001;
        
        processedData.forEach((value, i) => {
            const progress = i / processedData.length;
            const spiralAngle = progress * Math.PI * 6 + time;
            const baseRadius = progress * Math.min(centerX, centerY) * 0.8;
            const waveOffset = value * 0.5;
            
            const x = centerX + Math.cos(spiralAngle) * (baseRadius + waveOffset);
            const y = centerY + Math.sin(spiralAngle) * (baseRadius + waveOffset);
            
            // Connecting line to next point
            if (i < processedData.length - 1) {
                const nextProgress = (i + 1) / processedData.length;
                const nextAngle = nextProgress * Math.PI * 6 + time;
                const nextRadius = nextProgress * Math.min(centerX, centerY) * 0.8;
                const nextWave = processedData[i + 1] * 0.5;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    centerX + Math.cos(nextAngle) * (nextRadius + nextWave),
                    centerY + Math.sin(nextAngle) * (nextRadius + nextWave)
                );
                ctx.strokeStyle = getRainbowColor(i, processedData.length, 0.4);
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
            
            // Data point
            const pointSize = 2 + (value / 50);
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2);
            ctx.fillStyle = getRainbowColor(i, processedData.length, 0.8);
            ctx.fill();
        });
    }
};