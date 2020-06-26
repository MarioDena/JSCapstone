/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';

// eslint-disable-next-line no-undef
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 40, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }

  create() {
    this.add.image(200, 160, 'title');
    this.text = this.add.text(88, 20, 'Retro Adventure', { font: '22px Dragon' });
    this.gameButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.gameButton);

    this.gameText = this.add.text(0, 0, 'Play', { font: '10px Dragon', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.optionsButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.optionsButton, -1);

    this.optionsText = this.add.text(0, 0, 'Options', { font: '10px Dragon', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.ScoreButton = this.add.sprite(300, 200, 'playButton').setInteractive();
    this.centerButton(this.ScoreButton, -2);

    this.ScoreText = this.add.text(0, 0, 'Scores', { font: '10px Dragon', fill: '#fff' });
    this.centerButtonText(this.ScoreText, this.ScoreButton);

    this.gameButton.setScale(0.4, 0.4);
    this.optionsButton.setScale(0.4, 0.4);
    this.ScoreButton.setScale(0.4, 0.4);


    this.ScoreButton.on('pointerdown', (pointer) => {
      this.scene.start('Scores');
    });


    this.optionsButton.on('pointerdown', (pointer) => {
      this.scene.start('Options');
    });

    this.gameButton.on(
      'pointerdown',
      (pointer) => {
        this.scene.stop('Title');
        this.scene.run('Game');
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
