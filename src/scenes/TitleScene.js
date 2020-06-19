import 'phaser';
import config from '../config/config';

// eslint-disable-next-line no-undef
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
    this.load.image('title', './src/assets/title.jpeg');
  }

  centerButton(gameObject, offset = 0) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameObject,
      // eslint-disable-next-line max-len
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }

  create() {
    this.add.image(400, 120, 'title');
    this.gameButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.gameButton);
    this.gameButton.setScale(1, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.optionsButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.optionsButton, -1);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.ScoreButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.ScoreButton, -2);

    this.ScoreText = this.add.text(0, 0, 'Scores', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.ScoreText, this.ScoreButton);

    // eslint-disable-next-line no-unused-vars
    this.ScoreButton.on('pointerdown', (pointer) => {
      this.scene.start('Scores');
    });

    // eslint-disable-next-line no-unused-vars
    this.optionsButton.on('pointerdown', (pointer) => {
      this.scene.start('Options');
    });

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

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
