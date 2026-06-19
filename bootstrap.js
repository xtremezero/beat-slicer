// --- BOOTSTRAP PHASER ---
const phaserConfig = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainScene],
    scale: { mode: Phaser.Scale.RESIZE },
    transparent: true,
    antialias: true,
    antialiasGL: true,
    powerPreference: 'high-performance',
    input: {
        activePointers: 10  // support up to 10 simultaneous touch points
    }
};
const game = new Phaser.Game(phaserConfig);
// Default opaque background via CSS (toggled to transparent when custom bg is set)
game.events.once('ready', () => {
    const canvas = document.querySelector('#game-container canvas');
    if (canvas) canvas.style.background = '#020005';
});