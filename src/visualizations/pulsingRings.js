import { getRainbowColor } from '../config/colors.js';

export const pulsingRings = {
    name: "Pulsing Rings",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const numRings = 8;
        const samplesPerRing = Math.floor(processedData.length / numRings);
        
        for (let ring = 0; ring < numRings; ring++) {
            const start = ring * samplesPerRing;
            const end = start + samplesPerRing;
            const avgValue = processedData.slice(start, end)
                .reduce((a, b) => a + b, 0) / samplesPerRing;
            const radius = 50 + ring * 60 + avgValue * 0.8;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = getRainbowColor(ring, numRings, 0.5);
            ctx.lineWidth = 3 + avgValue / 30;
            ctx.stroke();
        }
    }
};