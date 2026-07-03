import { getRainbowColor } from '../config/colors.js';

export const hexagonGrid = {
    name: "Hexagon Grid",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const time = Date.now() * 0.001;
        const hexSize = 30;
        const rows = Math.ceil(canvas.height / (hexSize * 1.5)) + 1;
        const cols = Math.ceil(canvas.width / (hexSize * Math.sqrt(3))) + 1;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const offsetX = (row % 2) * (hexSize * Math.sqrt(3) / 2);
                const x = col * hexSize * Math.sqrt(3) + offsetX;
                const y = row * hexSize * 1.5;
                
                // Distance from center affects which audio data we sample
                const dx = x - centerX;
                const dy = y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
                
                const dataIndex = Math.floor((dist / maxDist) * processedData.length);
                const value = processedData[dataIndex] || 0;
                
                // Pulsing size based on audio
                const pulse = Math.sin(time * 3 + dist * 0.02) * 0.2 + 1;
                const currentSize = (hexSize * 0.4 + value * 0.08) * pulse;
                
                // Draw hexagon
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i + time * 0.5;
                    const hx = x + currentSize * Math.cos(angle);
                    const hy = y + currentSize * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(hx, hy);
                    } else {
                        ctx.lineTo(hx, hy);
                    }
                }
                ctx.closePath();
                
                const colorIndex = (dist / maxDist) * processedData.length;
                const alpha = 0.3 + (value / 400);
                ctx.fillStyle = getRainbowColor(colorIndex, processedData.length, alpha);
                ctx.fill();
                
                ctx.strokeStyle = getRainbowColor(colorIndex, processedData.length, 0.8);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
};