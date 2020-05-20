import 'phaser';

// eslint-disable-next-line no-undef
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', './src/assets/title.jpeg');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
