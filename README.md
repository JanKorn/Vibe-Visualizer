# Vibe Visualizer

A browser-based real-time **music visualizer**. It captures the audio of a browser tab or your entire screen and renders reactive, sound-driven animations on a fullscreen canvas.

Pure client-side project: vanilla JavaScript (ES modules), the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and the HTML5 Canvas 2D API — **no frameworks, no build step, no dependencies**.

---
**⚠️ Disclaimer: This project was mostly vibe coded for experimental reasons!⚠️**

---

## Features

- 🎵 **Live audio analysis** via `getDisplayMedia` — visualizes the sound of a tab or the system in real time
- 🎨 **14 visualizations**, switchable at any time (see below)
- 🖥️ **Fullscreen mode** and subtle, auto-hiding controls
- ⌨️ **Keyboard controls** (arrow keys + `F`)
- 🌈 Centrally configurable **color schemes** (`default`, `warm`, `cool`, `neon`)

### Included visualizations

Circular Vibe · Frequency Bars · Waveform Circle · Spiral Galaxy · Pulsing Rings · Star Field · DNA Helix · Kaleidoscope · Fireworks · Particle Waves · Tunnel Vision · Radial Burst · Spiral Wave · Hexagon Grid

## Running locally

Because the project uses ES modules, it must be served over an **HTTP server** (opening `index.html` directly via `file://` won't work due to the CORS rules for modules).

The easiest way — using [`serve`](https://www.npmjs.com/package/serve), no installation required:

```bash
npx serve .
```

Then open the displayed URL (typically `http://localhost:3000`) in your browser.

> **Tip:** Any other static server works just as well, e.g.:
> ```bash
> python -m http.server 8000
> ```

## Usage

1. Click **"Start Audio Vibe"**.
2. In the picker dialog, choose a **tab**, a **window** or your **entire screen** — and make sure to enable **"Share audio"** (otherwise there's no sound to visualize).
3. Play music/video in the shared source and enjoy the visualization.

| Action | Control |
| --- | --- |
| Next visualization | **Next ▶** button or arrow key **→** |
| Previous visualization | **◀ Back** button or arrow key **←** |
| Toggle fullscreen | Fullscreen button (top right) or key **F** |

The controls appear when you move the mouse to the bottom or top edge of the screen and fade out again after a short while.

## Project structure

```
.
├── index.html              # Entry point, layout & styles
└── src/
    ├── script.js           # App bootstrap, main render loop
    ├── audio.js            # Audio capture & frequency analysis
    ├── controls.js         # UI controls (navigation, fullscreen, keyboard)
    ├── config/
    │   └── colors.js       # Central color schemes & color helpers
    └── visualizations/
        ├── index.js        # Registers all visualizations
        └── *.js            # One file per visualization
```

### Adding your own visualization

1. Create a new file in `src/visualizations/` that exports an object with a `name` and a `draw(ctx, processedData, centerX, centerY, canvas)` method.
2. Import the export in [`src/visualizations/index.js`](src/visualizations/index.js) and add it to the `visualizations` array.

`processedData` is a `Uint8Array` of normalized frequency values (0–255).

## Browser support

Requires a modern Chromium-based browser (Chrome, Edge). Audio capture via `getDisplayMedia({ audio: true })` is only partially supported (or not at all) in Firefox and Safari.

## License

This project is licensed under the **GNU General Public License v3.0** — see [LICENSE](https://www.gnu.org/licenses/gpl-3.0.html).

© 2026 Jan Kornberger
