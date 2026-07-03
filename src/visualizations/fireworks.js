export const fireworks = {
    name: "Fireworks",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            if (value > 80) {
                const angle = Math.random() * Math.PI * 2;
                const distance = value * 2.5;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                const hue = Math.random() * 360;
                ctx.beginPath();
                ctx.arc(x, y, value / 35, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
                ctx.fill();
                
                // Trail
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.2)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }
};