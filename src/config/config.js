import 'phaser';

export default {
  // eslint-disable-next-line no-undef
  type: Phaser.AUTO,
  parent: 'content',
  width: 400,
  height: 320,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};