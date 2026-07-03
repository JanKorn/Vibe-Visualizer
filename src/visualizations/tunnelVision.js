export const tunnelVision = {
    name: "Tunnel Vision",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const numCircles = 15;
        const samplesPerCircle = Math.floor(processedData.length / numCircles);
        
        for (let i = 0; i < numCircles; i++) {
            const start = i * samplesPerCircle;
            const end = start + samplesPerCircle;
            const avgValue = processedData.slice(start, end)
                .reduce((a, b) => a + b, 0) / samplesPerCircle;
            const radius = (numCircles - i) * 40 + avgValue * 0.8;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            const hue = (i / numCircles) * 360 + Date.now() * 0.1;
            ctx.strokeStyle = `hsla(${hue % 360}, 80%, 60%, ${0.8 - i * 0.05})`;
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    }
};