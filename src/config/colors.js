// Centralized color configuration
// You can easily change colors here or add color schemes

export const colorSchemes = {
    default: {
        primary: { h: 200, s: 80, l: 60 },
        secondary: { h: 180, s: 80, l: 60 },
        range: 360 // Full spectrum
    },
    warm: {
        primary: { h: 0, s: 80, l: 60 },
        secondary: { h: 30, s: 80, l: 60 },
        range: 60
    },
    cool: {
        primary: { h: 200, s: 80, l: 60 },
        secondary: { h: 260, s: 80, l: 60 },
        range: 120
    },
    neon: {
        primary: { h: 280, s: 100, l: 50 },
        secondary: { h: 180, s: 100, l: 50 },
        range: 360
    }
};

let currentScheme = 'default';

export function setColorScheme(schemeName) {
    if (colorSchemes[schemeName]) {
        currentScheme = schemeName;
    }
}

export function getColorScheme() {
    return colorSchemes[currentScheme];
}

// Helper function to generate HSL color
export function getColor(value, index = 0, total = 1, alpha = 0.8) {
    const scheme = getColorScheme();
    const hue = scheme.primary.h + (index / total) * scheme.range + (value / 5);
    return `hsla(${hue}, ${scheme.primary.s}%, ${scheme.primary.l}%, ${alpha})`;
}

// Get rainbow color based on index
export function getRainbowColor(index, total, alpha = 0.8) {
    const scheme = getColorScheme();
    const hue = scheme.primary.h + (index / total) * scheme.range;
    return `hsla(${hue}, ${scheme.primary.s}%, ${scheme.primary.l}%, ${alpha})`;
}

// Get color with custom hue offset
export function getColorWithOffset(baseHue, offset, alpha = 0.8) {
    const scheme = getColorScheme();
    return `hsla(${baseHue + offset}, ${scheme.primary.s}%, ${scheme.primary.l}%, ${alpha})`;
}