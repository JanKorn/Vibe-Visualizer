import { getRainbowColor, getColorWithOffset } from '../config/colors.js';

export const dnaHelix = {
    name: "DNA Helix",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            const x = (i / processedData.length) * canvas.width;
            const y1 = centerY + Math.sin(i * 0.15) * (100 + value * 0.6);
            const y2 = centerY + Math.sin(i * 0.15 + Math.PI) * (100 + value * 0.6);
            
            const color1 = getRainbowColor(i, processedData.length, 0.8);
            const color2 = getColorWithOffset((i / processedData.length) * 360, 180, 0.8);
            
            ctx.beginPath();
            ctx.arc(x, y1, 3, 0, Math.PI * 2);
            ctx.fillStyle = color1;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(x, y2, 3, 0, Math.PI * 2);
            ctx.fillStyle = color2;
            ctx.fill();
            
            if (i % 8 === 0) {
                ctx.beginPath();
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.strokeStyle = getRainbowColor(i, processedData.length, 0.3);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }
};