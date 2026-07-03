import { getRainbowColor } from '../config/colors.js';

export const frequencyBars = {
    name: "Frequency Bars",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const barWidth = canvas.width / processedData.length;
        processedData.forEach((value, i) => {
            const barHeight = value * 2.5;
            const x = i * barWidth;
            const y = canvas.height - barHeight;
            
            ctx.fillStyle = getRainbowColor(i, processedData.length, 0.8);
            ctx.fillRect(x, y, barWidth - 2, barHeight);
        });
    }
};