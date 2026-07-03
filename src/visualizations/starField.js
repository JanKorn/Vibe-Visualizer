export const starField = {
    name: "Star Field",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        processedData.forEach((value, i) => {
            if (value > 80) {
                const x = (i / processedData.length) * canvas.width;
                const y = Math.random() * canvas.height;
                const size = (value / 255) * 6;
                
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${Math.random() * 360}, 80%, 80%, 0.9)`;
                ctx.fill();
            }
        });
    }
};