import 'phaser';
import config from '../config/config';

// eslint-disable-next-line no-undef
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {}

  centerButton(gameObject, offset = 0) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameObject,
      // eslint-disable-next-line max-len
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  create() {
    this.gameButton = this.add.sprite(100, 200, 'playButton').setInteractive();
    this.centerButton(this.gameButton, -2);
    this.gameButton.setScale(1, 0.7);
    this.gameButton.on(
      'pointerdown',
      // eslint-disable-next-line no-unused-vars
      (pointer) => {
        this.scene.start('Game');
      },
    );

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('playButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('playButton');
    });
  }
}
