import { getColor } from '../config/colors.js';

export const kaleidoscope = {
    name: "Kaleidoscope",
    
    draw(ctx, processedData, centerX, centerY, canvas) {
        const segments = 8;
        for (let seg = 0; seg < segments; seg++) {
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((seg / segments) * Math.PI * 2);
            
            processedData.forEach((value, i) => {
                const x = i * 2.5;
                const y = value * 1.2;
                
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = getColor(value, i + seg * 30, 360, 0.7);
                ctx.fill();
            });
            
            ctx.restore();
        }
    }
};