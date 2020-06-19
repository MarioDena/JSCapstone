/* eslint-disable no-unused-vars */
import 'phaser';

// eslint-disable-next-line no-undef
export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(250, 200, 'checkedBox').setInteractive();
    this.musicText = this.add.text(300, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(250, 300, 'checkedBox').setInteractive();
    this.soundText = this.add.text(300, 290, 'Sound Enabled', { fontSize: 24 });

    this.menuButton = this.add.sprite(400, 500, 'playButton').setInteractive();
    this.menuText = this.add.text(0, 0, 'Back', { fontSize: '32px', fill: '#fff' });
    // eslint-disable-next-line no-undef
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', (pointer) => {
      this.scene.start('Title');
    });

    this.musicButton.setScale(0.5, 0.5);
    this.soundButton.setScale(0.5, 0.5);

    this.musicButton.on('pointerdown', (pointer) => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', (pointer) => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();
  }
}