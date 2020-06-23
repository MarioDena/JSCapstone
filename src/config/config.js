import 'phaser';

export default {
  // eslint-disable-next-line no-undef
  type: Phaser.AUTO,
  width: 400,
  height: 320,
  zoom: 2,
  pixelArt: true,
  parent: 'parent',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};