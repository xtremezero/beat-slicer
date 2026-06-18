// --- CONFIGURATION ---
const THEMES = {
    'cyberpink': { primary: 0x00ffff, secondary: 0xff00ff },
};

const GRID_POSITIONS = [
    { x: -0.35, y: -0.25 }, { x: 0, y: -0.25 }, { x: 0.35, y: -0.25 },
    { x: -0.35, y: 0.05 },    { x: 0, y: 0.05 },    { x: 0.35, y: 0.05 }
];

const CONFIG = {
    approachTime: 2.3, fluxSensitivity: 0.022, frequencyFilter: 150, minBeatGap: 0.35,
    gridScale: 0.65, gridYOffset: 20, cubeScale: 1.0, swipeThreshold: 15,
    difficulty: 'medium', dotsOnlyMode: false, visualTheme: 'cyberpink', visualizerGlow: 1.0,
    sensitivity: 'normal', seed: 'xtremezero'
};

// --- PRNG ---
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067); h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213); h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067); h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213); h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return (h1^h2^h3^h4) >>> 0;
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

let seededRandom = Math.random;

function initSeed(seedStr) {
    if (!seedStr) seedStr = Math.random().toString(36).substring(2, 10);
    CONFIG.seed = seedStr;
    seededRandom = mulberry32(cyrb128(seedStr));
}
initSeed(CONFIG.seed);